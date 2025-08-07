from rest_framework import generics
from apps.drivers.models import DriverProfile
from apps.shipments.models import Shipment
from .serializers import AvailableDriverSerializer, ShipmentSerializer

class AvailableDriversView(generics.ListAPIView):
    queryset = DriverProfile.objects.filter(disponivel=True)
    serializer_class = AvailableDriverSerializer

class ListShipmentsView(generics.ListAPIView):
    serializer_class = ShipmentSerializer
    
    def get_queryset(self):
        return Shipment.objects.filter(client=self.request.user)
