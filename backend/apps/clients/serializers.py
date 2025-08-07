from rest_framework import serializers
from apps.drivers.models import DriverProfile
from apps.shipments.models import Shipment

class AvailableDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = ['id', 'user', 'veiculo', 'capacidade_carga', 'disponivel']

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'
