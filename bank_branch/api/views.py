from rest_framework.views import APIView
from rest_framework.response import Response

from geopy.distance import geodesic

from search.models import Bank
from search.serializers import BanksWithinMapBoundsSerializer, BankDetailsSerializer

class BanksWithinMapBoundsView(APIView):
    def get(self, request):
        zoom = int(request.GET.get('zoom'))
        bounds = [str(i) for i in request.GET.get('bounds').split(',')]  # bounds в формате (min_lat, min_lon, max_lat, max_lon)
        # Рассчитываем координаты видимого участка карты на основе параметров масштаба

        min_lat, max_lat, min_lon, max_lon = bounds[0], bounds[2], bounds[1], bounds[3]

        # Ищем банки, находящиеся в пределах видимого участка карты
        banks = Bank.objects.filter(latitude__gte=min_lat, latitude__lte=max_lat, longitude__gte=min_lon, longitude__lte=max_lon)
        serializer = BanksWithinMapBoundsSerializer(banks, many=True)
        return Response(serializer.data)

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





