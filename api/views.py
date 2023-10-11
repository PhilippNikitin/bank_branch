import random

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from search.models import Bank
from .serializer import AllBanksSerializer, BankSerializer
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





