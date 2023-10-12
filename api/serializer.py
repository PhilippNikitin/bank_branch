from rest_framework import serializers
from search.models import Bank

class AllBanksSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    class Meta:
        model = Bank
        fields = ['id', 'latitude', 'longitude']

class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'

class BanksWithinMapBoundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ('name', 'latitude', 'longitude')