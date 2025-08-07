from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from apps.accounts.models import User
from apps.shipments.models import Shipment
from .models import DriverProfile
from .serializers import DriverProfileSerializer, ShipmentSerializer

class DriverRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = DriverProfileSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['is_driver'] = True
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "message": "Motorista registrado com sucesso.",
            "user_id": user.user.id
        }, status=status.HTTP_201_CREATED)

class DriverLoginView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        identifier = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=identifier, password=password)
        if not user:
            user = authenticate(telefone=identifier, password=password)

        if user and hasattr(user, 'driver_profile'):
            return Response({
                "message": "Login realizado com sucesso.",
                "user_id": user.id
            }, status=status.HTTP_200_OK)
        return Response({"error": "Credenciais inválidas ou usuário não é motorista."},
                        status=status.HTTP_401_UNAUTHORIZED)

class NearbyShipmentsView(generics.ListAPIView):
    serializer_class = ShipmentSerializer

    def get_queryset(self):
        # Exemplo fictício — ajuste de acordo com sua lógica de proximidade
        driver = self.request.user.driver_profile
        return Shipment.objects.exclude(driver=driver.user).filter(status='pendente')

class DriverShipmentsView(generics.ListAPIView):
    serializer_class = ShipmentSerializer

    def get_queryset(self):
        return Shipment.objects.filter(driver=self.request.user)
