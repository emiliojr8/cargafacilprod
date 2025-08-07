from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Notification, LaunchNotificationRequest
from .serializers import NotificationSerializer, LaunchNotificationRequestSerializer

class NotificationViewSet(ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

class LaunchNotificationRequestViewSet(ModelViewSet):
    queryset = LaunchNotificationRequest.objects.all()
    serializer_class = LaunchNotificationRequestSerializer
    permission_classes = [AllowAny]  # Permitido para usuários não autenticados
    http_method_names = ['post']  # Apenas POST (criação)
