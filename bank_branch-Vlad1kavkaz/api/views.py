from decimal import Decimal
from datetime import datetime, time, timedelta
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from search.models import Bank
from .serializer import AllBanksSerializer, BankSerializer, BanksWithinMapBoundsSerializer
import math

class BankListAPIView(generics.ListAPIView):
    serializer_class = AllBanksSerializer

    def get_queryset(self):
        return Bank.objects.all()

    def get(self, request, *args, **kwargs):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')
        radius = request.query_params.get('radius')

        if latitude and longitude and radius:
            queryset = self.filter_queryset(latitude, longitude, radius)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        data = self.list(request, *args, **kwargs).data
        return Response(data)

    def filter_queryset(self, latitude, longitude, radius):
        lat1 = math.radians(float(latitude))
        lon1 = math.radians(float(longitude))
        R = 6371  # радиус Земли в километрах

        queryset = []
        for bank in self.get_queryset():
            lat2 = math.radians(float(bank.latitude))
            lon2 = math.radians(float(bank.longitude))

            dlon = lon2 - lon1
            dlat = lat2 - lat1

            a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            distance = R * c

            if distance <= float(radius):
                queryset.append(bank)

        return queryset

class BankDetailAPIView(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        bank = Bank.objects.filter(id=id).first()

        if not bank:
            return Response({"error": "Bank not found."}, status=404)

        serializer = BankSerializer(instance=bank)
        return Response(serializer.data)


class BestBankView(APIView):  # для работы нужен сериализатор, который получает из базы данных информацию: id, work_schedule, latitude, longitude, services. Необходимо учесть загруженность банков.
    # 1. Получаем query_set из всех банков +
    def get_all_banks(self):
        return Bank.objects.all()

    '''
    2. фильтруем банки, если они сейчас работают или нет (опционально - с учетом часового пояса) Если не один из банков не работает, возвращаем ответ "В настоящее время ни один из банков не работает.
    Наше рабочее время: ..."
    '''

    def get_working_banks(self):
        banks = Bank.objects.all()
        id_working_now = []

        days_on_week = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday"}

        current_time = datetime.now()
        current_weekday = current_time.weekday()
        for bank in banks:
            if current_weekday == 6:
                continue

            start_time = datetime.strptime(bank.work_schedule[days_on_week[current_weekday]]["start_time"],
                                           "%H:%M").time()
            end_time = datetime.strptime(bank.work_schedule[days_on_week[current_weekday]]["end_time"], "%H:%M").time()

            if start_time <= current_time.time() <= end_time:
                id_working_now.append(bank.id)
        return id_working_now

    # 3. достаем из запроса услуги +

    def get_services(self, request):
        # получаем из запроса список услуг, которые выбрал пользователь
        services = request.query_params.get("services")  # получаем из запроса список услуг в формате строки без пробелов
        services_list = [f'{service}' for service in services.lower().split(',')]  # получаем список из строк - услуг, выбранных пользователем, при этом каждая услуга заключена в двойные кавычки
        return services_list

    '''
    4. фильтруем все банки по наличию услуг - остаются только те банки, в которых оказываются все интересующие клиента услуги. Если полного набора услуг в одном месте нет - возвращаем ответ
    "Банка с полным набором указанных услуг не существует. Пожалуйста, уменьшите перечень услуг" +
    '''

    def get_banks_with_services(self, request):
        services_set = set(self.get_services(request))
        all_banks = self.get_all_banks()
        id_of_banks_with_services = []  # список для хранения id банков

        for bank in all_banks:
            services_in_bank = set(bank.services.keys()) # множество услуг в текущем банке
            if services_set.issubset(services_in_bank):
                id_of_banks_with_services.append(bank.id)
        return id_of_banks_with_services

        # else:
        #     return Response({"error": "Банка, в котором оказываются все указанные услуги, не существует. Пожалуйста, уменьшите список услуг"},status=404)

    # 6. получаем пересечение банков final_query, которые сейчас работают, и которые обладают всем необходимым перечнем услуг - с ними мы будем работать.

    def get_final_queryset(self, request):
        working = self.get_working_banks()
        bank_services = self.get_banks_with_services(request)
        final_queryset = set(working).intersection(set(bank_services))
        final_bank = Bank.objects.filter(pk__in=final_queryset)
        return final_bank

    '''
    7. Далее создаем два словаря: в одном будут храниться банки, которые могут быть использованы для построения пешеходного маршрута; в другом - банки, которые могут быть использованы для построения автомобильного маршрута
    Далее для каждого из полученного final_queryset банка рассчитываем время, за которое пользователь может до него добраться, и прибавляем ориентировочное время ожидания в очереди

    '''

    '''
    7.1 расстояние между точками
    '''
    def filter_queryset(self, latitude, longitude, radius, query_set):
        lat1 = math.radians(float(latitude))
        lon1 = math.radians(float(longitude))
        R = 6371  # радиус Земли в километрах

        queryset = []
        for bank in query_set:
            lat2 = math.radians(float(bank.latitude))
            lon2 = math.radians(float(bank.longitude))

            dlon = lon2 - lon1
            dlat = lat2 - lat1

            a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            distance = R * c

            if distance <= float(radius):
                queryset.append(bank)

        return queryset
    def get(self, request):
        def find_walking_length(start_lat, start_lon, end_lat, end_lon):
            lat1 = math.radians(start_lat)
            lon1 = math.radians(start_lon)
            lat2 = math.radians(end_lat)
            lon2 = math.radians(end_lon)

            # Радиус Земли в километрах
            radius = 6371

            # Разница между широтами и долготами
            dlat = lat2 - lat1
            dlon = lon2 - lon1

            # Формула Хаверсайна
            a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

            # Расстояние в километрах
            distance = radius * c

            return distance

        def find_driving_length(start_lat, start_lon, end_lat, end_lon):
            lat1 = math.radians(start_lat)
            lon1 = math.radians(start_lon)
            lat2 = math.radians(end_lat)
            lon2 = math.radians(end_lon)

            # Радиус Земли в километрах
            radius = 6371

            # Разница между широтами и долготами
            dlat = lat2 - lat1
            dlon = lon2 - lon1

            # Формула Хаверсайна
            a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

            # Расстояние в километрах
            distance = radius * c

            return distance

        def get_workload():  # функция, которая возвращает загруженность исходя из времени суток
            current_time = datetime.now().time()

            if time(12, 0) <= current_time <= time(14, 0) or time(16, 0) <= current_time <= time(18, 0):
                workload = "high"
            elif time(14, 0) < current_time < time(16, 0) or time(11, 0) <= current_time < time(12, 0):
                workload = "medium"
            elif time(9, 0) <= current_time < time(11, 0):
                workload = "low"
            else:
                workload = "unknown"


            return workload



        on_foot = {}  # словарь, в котором будут храниться банки, которые будут отбираться для пешеходного маршрута
        on_car = {}  # словарь, в котором будут храниться банки, которые будут отбираться для автомобильного маршрута
        user_banks = self.get_final_queryset(request)  # получаем final query_set (см. шаг 6)
        start_lat = request.query_params.get("latitude")  # получаем широту начальной точки
        start_lon = request.query_params.get("longitude")# получаем долготу начальной точки

        if user_banks:
            for bank in user_banks:
                # находим длину пешеходного и автомобильного маршрутов
                walking_length = find_walking_length(float(start_lat), float(start_lon), float(bank.latitude), float(bank.longitude)) # находим длину пешеходного маршрута для данного банка
                driving_length = find_driving_length(float(start_lat), float(start_lon), float(bank.latitude), float(bank.longitude))  # находим длину автомобильного маршрута для данного банка# находим приблизительное время, которое уйдет на пешеходный и автомобильный маршрут
                walking_time = (walking_length / 5) * 60  # средняя скорость принята за 5 км/ч, время в минутах
                driving_time = (driving_length / 50) * 60  # средняя скорость автомобиля принята за 50 км/ч, время в минутах

                workload = get_workload()
                total_walking_time = walking_time
                total_driving_time = driving_time
                if workload == 'low':
                    total_walking_time = walking_time + 5
                    total_driving_time = driving_time + 5

                if workload == 'medium':
                    total_walking_time = walking_time + 10
                    total_driving_time = driving_time + 10

                if workload == 'high':
                    total_walking_time = walking_time + 20
                    total_driving_time = driving_time + 20

                on_foot[bank.id] = total_walking_time
                on_car[bank.id] = total_driving_time
        else:
            return Response("empty user_banks")

        best_on_foot_bank_id = min(on_foot, key=on_foot.get)
        best_on_car_bank_id = min(on_car, key=on_car.get)

        # Выводим найденный ключ и его значение

        best_on_foot_bank = Bank.objects.filter(id=best_on_foot_bank_id)
        best_on_foot_bank_serializer = BankSerializer(best_on_foot_bank[0])
        best_on_foot_bank_data = best_on_foot_bank_serializer.data
        best_on_foot_bank_data["label"] = "Лучший банк для пешеходного маршрута"

        best_on_car_bank = Bank.objects.filter(id=best_on_car_bank_id)
        best_on_car_bank_serializer = BankSerializer(best_on_car_bank[0])
        best_on_car_bank_data = best_on_car_bank_serializer.data
        best_on_car_bank_data["label"] = "Лучший банк для автомобильного маршрута"

        response_data = [best_on_foot_bank_data, best_on_car_bank_data]

        return Response(response_data)

class StayQueue(APIView):
    def get(self, request):
        bank = Bank.objects.filter(id=request.query_params["id"])[0]
        service = request.query_params["services"]
        col_people = bank.queue[f"{service}"]["people"]
        minutes_in_queue = bank.queue[service]["minutes"]
        time_in_queue = col_people * minutes_in_queue

        current_time = datetime.now()
        # Добавляем время в очереди
        queue_time = current_time + timedelta(minutes=time_in_queue[0])
        # Преобразуем время в нужный формат (например, строку)
        queue_time_formatted = queue_time.strftime("%Y-%m-%d %H:%M:%S")
        number_talon = service.upper() + str(col_people + 1)
        # Возвращаем время вместе с сообщением
        response_data = f"Ваше время приема: {queue_time_formatted}, Ваш талон номер: {number_talon}"
        return Response(response_data)

class BanksWithinMapBoundsView(APIView):
    def get(self, request):
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

