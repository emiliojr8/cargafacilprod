# shipments/serializers.py
from rest_framework import serializers
from .models import Shipment

class MobileShipmentSerializer(serializers.ModelSerializer):
    """Serializer otimizado para mobile"""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Shipment
        fields = [
            'id',
            'origin',
            'destination',
            'status',
            'status_display',
            'created_at'
        ]
        read_only_fields = ['status']

# shipments/views.py
from rest_framework.viewsets import ModelViewSet
from .models import Shipment
from .serializers import MobileShipmentSerializer

class MobileShipmentViewSet(ModelViewSet):
    """Viewset para aplicativo mobile"""
    queryset = Shipment.objects.all()
    serializer_class = MobileShipmentSerializer
    filterset_fields = ['status']
    search_fields = ['reference']