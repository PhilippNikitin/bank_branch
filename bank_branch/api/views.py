import requests
import json
import random

from decimal import Decimal
from geopy.distance import geodesic

from rest_framework.views import APIView
from rest_framework.response import Response

from search.models import Bank
from search.serializers import BanksWithinMapBoundsSerializer, BankDetailsSerializer


class BanksWithinMapBoundsView(APIView):
    def get(self, request):
        zoom = int(request.GET.get('zoom'))
        bounds = [Decimal(i) for i in request.GET.get('bounds').split(',')]  # bounds в формате 'min_lat,min_lon,max_lat,max_lon'
        min_lat, min_lon, max_lat, max_lon = bounds[0], bounds[1], bounds[2], bounds[3]

        # Ищем банки, находящиеся в пределах видимого участка карты
        banks = Bank.objects.all()
        filtered_banks = []
        for bank in banks:
            latitude = Decimal(bank.latitude)
            longitude = Decimal(bank.longitude)
            if min_lat <= latitude <= max_lat and min_lon <= longitude <= max_lon:
                filtered_banks.append(bank)
        serializer = BanksWithinMapBoundsSerializer(filtered_banks, many=True)

        coordinates = [{"latitude": Decimal(bank.latitude), "longitude": Decimal(bank.longitude)} for bank in filtered_banks]
        return Response(coordinates)

class BankDetailsView(APIView):
    def get(self, request):
        latitude = request.GET.get('latitude')
        longitude = request.GET.get('longitude')

        # Ищем банк по переданным координатам
        try:
            banks = Bank.objects.filter(latitude=latitude, longitude=longitude)
            serializer = BankDetailsSerializer(banks, many=True)
            return Response(serializer.data)
        except Bank.DoesNotExist:
            return Response(status=404)


class BestBankView(APIView):  # для работы нужен сериализатор, который получает из базы данных информацию: id, work_schedule, latitude, longitude, services. Необходимо учесть загруженность банков.
    
    # 1. Получаем query_set из всех банков +
    def get_all_banks(self):
        return Bank.objects.all()
    
    '''
    2. фильтруем банки, если они сейчас работают или нет (опционально - с учетом часового пояса) Если не один из банков не работает, возвращаем ответ "В настоящее время ни один из банков не работает.
    Наше рабочее время: ..."
    '''
    def get_working_banks(self):
        working_banks = Bank.objects.filter(is_open_now = True)
        return working_banks if len(working_banks) > 0 else Response({"error": "В настоящее время ни один из банков не работает. Пожалуйста, обратитесь в наше рабочее время"}, status=404)
    
    # 3. достаем из запроса услуги +

    def get_services(self, request, *args, **kwargs):
        # получаем из запроса список услуг, которые выбрал пользователь
        services = request.query_params.get("services")  # получаем из запроса список услуг в формате строки без пробелов
        services_list = [f'"{service}"' for service in services.lower().split(',')]  # получаем список из строк - услуг, выбранных пользователем, при этом каждая услуга заключена в двойные кавычки
        return services_list
        
    '''
    4. фильтруем все банки по наличию услуг - остаются только те банки, в которых оказываются все интересующие клиента услуги. Если полного набора услуг в одном месте нет - возвращаем ответ
    "Банка с полным набором указанных услуг не существует. Пожалуйста, уменьшите перечень услуг" +
    '''
    def get_banks_with_services(self, request):
        services_set = set(self.get_services(request))
        all_banks = self.get_all_banks()
        id_of_banks_with_services = list()  # создаем пустой список, куда будем добавлять id банков, в которых содержатся все услуги из services_list
        for bank in all_banks:
            services_in_bank = {i for i in bank.sevices if bank.services[i]["services"]}  # создаем множество из всех услуг, оказываемых в данном банке
            if services_set.issubset(services_in_bank):
                id_of_banks_with_services.append(bank.id)
        if id_of_banks_with_services:
            banks_with_services = Bank.objects.filter(pk__in=id_of_banks_with_services)
            return banks_with_services
        else: 
            return Response({"error": "Банка, в котором оказываются все указанные услуги, не существует. Пожалуйста, уменьшите список услуг"}, status=404)
    
    # 6. получаем пересечение банков final_query, которые сейчас работают, и которые обладают всем необходимым перечнем услуг - с ними мы будем работать.

    def get_final_queryset(self, request):
        final_queryset = self.get_working_banks().intersection(self.get_banks_with_services(request))
        return final_queryset

    '''
    7. Далее создаем два словаря: в одном будут храниться банки, которые могут быть использованы для построения пешеходного маршрута; в другом - банки, которые могут быть использованы для построения автомобильного маршрута
    Далее для каждого из полученного final_queryset банка рассчитываем время, за которое пользователь может до него добраться, и прибавляем ориентировочное время ожидания в очереди
        
    '''
    def get(self, request):
        def find_walking_length(start_lat, start_lon, end_lat, end_lon):  # функция для нахождения длины пешеходного маршрута
            # Формируем URL-адрес запроса к API маршрутизации
            url = f"http://router.project-osrm.org/route/v1/walking/{start_lon},{start_lat};{end_lon},{end_lat}?overview=full&geometries=geojson"

            # Отправляем GET-запрос и получаем данные маршрута
            response = requests.get(url)
            data = json.loads(response.text)

            # Извлекаем координаты геометрии маршрута и считаем его длину
            route_geometry = data['routes'][0]['geometry']
            route_coordinates = [(point[1], point[0]) for point in route_geometry['coordinates']]
            walking_length = sum(geodesic(c1, c2).meters for c1, c2 in zip(route_coordinates[:-1], route_coordinates[1:]))

            return walking_length

        def find_driving_length(start_lat, start_lon, end_lat, end_lon):
            # Формируем URL-адрес запроса к API маршрутизации
            url = f"http://router.project-osrm.org/route/v1/driving/{start_lon},{start_lat};{end_lon},{end_lat}?overview=full&geometries=geojson"

            # Отправляем GET-запрос и получаем данные маршрута
            response = requests.get(url)
            data = json.loads(response.text)

            # Извлекаем координаты геометрии маршрута и считаем его длину
            route_geometry = data['routes'][0]['geometry']
            route_coordinates = [(point[1], point[0]) for point in route_geometry['coordinates']]
            driving_length = sum(geodesic(c1, c2).meters for c1, c2 in zip(route_coordinates[:-1], route_coordinates[1:]))

            return driving_length

        on_foot = {}  # словарь, в котором будут храниться банки, которые будут отбираться для пешеходного маршрута
        on_car = {}  # словарь, в котором будут храниться банки, которые будут отбираться для автомобильного маршрута
        user_banks = self.get_final_queryset(request)  # получаем final query_set (см. шаг 6)
        start_lat = request.query_params.get("latitude")  # получаем широту начальной точки
        start_lon = request.query_params.get("longitude")  # получаем долготу начальной точки
        for bank in user_banks:
            # находим длину пешеходного и автомобильного маршрутов
            walking_length = find_walking_length(start_lat, start_lon, float(bank.latitude), float(bank.longitude))  # находим длину пешеходного маршрута для данного банка
            driving_length = find_driving_length(start_lat, start_lon, float(bank.latitude), float(bank.longitude))  # находим длину автомобильного маршрута для данного банка

            # находим приблизительное время, которое уйдет на пешеходный и автомобильный маршрут
            walking_time = (walking_length / 5) * 60  # средняя скорость принята за 5 км/ч, время в минутах
            driving_time = (driving_length / 50) * 60 # средняя скорость автомобиля принята за 50 км/ч, время в минутах

            workload = random.choices(['Низкая', 'Средняя', 'Высокая'])  # загруженность генерируется рандомно для каждого банка
            if workload == 'Низкая':
                total_walking_time = walking_time + 5
                total_driving_time = driving_time + 5

            if workload == 'Средняя':
                total_walking_time = walking_time + 10
                total_driving_time = driving_time + 10

            if workload == 'Высокая':
                total_walking_time = walking_time + 20
                total_driving_time = driving_time + 20


            on_foot[bank.id] = total_walking_time
            on_car[bank.id] = total_driving_time

        min_walking_time = min(on_foot.keys())  # минимальное время, за которое можно добраться до лучшего банка пешком
        min_driving_time = min(on_car.keys())  # минимальное время, за которое можно добраться до лучшего банка на машине

        for k, v in on_foot.items():
            if v == min_walking_time:
                best_on_foot_bank_id = k  # находим id банка, до которого удобнее всего добраться пешком

        for k, v in on_car.items():
            if v == total_driving_time:
                best_on_car_bank_id = k  # находим id банка, до которого удобнее всего добраться на машине


        best_on_foot_bank = Bank.objects.filter(id=best_on_foot_bank_id)
        best_on_foot_bank_serializer = BankDetailsSerializer(best_on_foot_bank)
        best_on_foot_bank_data = best_on_foot_bank_serializer.data
        best_on_foot_bank_data["label"] = "Лучший банк для пешеходного маршрута"

        best_on_car_bank = Bank.objects.filter(id=best_on_car_bank_id)
        best_on_car_bank_serializer = BankDetailsSerializer(best_on_car_bank)
        best_on_car_bank_data = best_on_car_bank_serializer.data
        best_on_car_bank_data["label"] = "Лучший банк для автомобильного маршрута"

        response_data = [best_on_foot_bank_data, best_on_car_bank_data]
        
        return Response(response_data)


