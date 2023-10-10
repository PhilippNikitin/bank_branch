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





