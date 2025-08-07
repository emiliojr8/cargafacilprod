# apps/shipments/views.py (atualizado)
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Shipment
from .serializers import MobileShipmentSerializer

class MobileShipmentViewSet(ReadOnlyModelViewSet):
    serializer_class = MobileShipmentSerializer
    filterset_fields = ['status']
    
    def get_queryset(self):
        user = self.request.user
        if user.is_driver:
            return Shipment.objects.filter(status='pending')
        return Shipment.objects.filter(cliente=user)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        shipment = self.get_object()
        if not request.user.is_driver:
            return Response(
                {"error": "Only drivers can accept shipments"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        shipment.motorista = request.user
        shipment.status = 'accepted'
        shipment.save()
        
        return Response(
            {"status": "Shipment accepted"},
            status=status.HTTP_200_OK
        )

# Atualize urls.py para usar ViewSet
from rest_framework.routers import DefaultRouter
from .views import MobileShipmentViewSet

router = DefaultRouter()
router.register(r'shipments', MobileShipmentViewSet, basename='mobile-shipments')

urlpatterns = router.urls