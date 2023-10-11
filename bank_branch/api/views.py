from datetime import datetime
from decimal import Decimal

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
    def get_banks_with_services(self):
        services_set = set(self.get_services())
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

    def get_final_queryset(self):
        final_queryset = self.get_working_banks().intersection(self.get_banks_with_services())
        return final_queryset

    '''
    7. Далее создаем два словаря: в одном будут храниться банки, которые могут быть использованы для построения пешеходного маршрута; в другом - банки, которые могут быть использованы для построения автомобильного маршрута
    Далее для каждого из полученного final_query банка рассчитываем время, за которое пользователь может до него добраться, и прибавляем ориентировочное время ожидания в очереди
    
    '''

    '''
    8. Ориентировочное количество человек в очереди:
    (n // количество окон) * среднее время оказания одной услуги
    '''

    # 9. Из словарей получаем банк с минимальным временем ожидания - и для пешеходного маршрута, и для автомобильного. По id находим координаты данных двух банков

    # 10. Возвращаем координаты лучших банков на клиент

    # ????????

    # PROFIT.
     

    





