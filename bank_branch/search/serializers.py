from rest_framework import serializers

from search.models import Bank

class BanksWithinMapBoundsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ('name', 'latitude', 'longitude')

class BankDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ('id', 'name', 'address', 'latitude', 'longitude', 'work_schedule', 'services')
