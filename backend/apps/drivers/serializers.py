from rest_framework import serializers
from apps.drivers.models import DriverProfile  # <-- IMPORT CORRETO ADICIONADO
from apps.shipments.models import Shipment


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'


class DriverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = '__all__'
