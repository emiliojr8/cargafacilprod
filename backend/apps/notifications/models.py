# notifications/models.py
from django.db import models
from django.conf import settings

class Notification(models.Model):
    """Notificações push para usuários mobile"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    notification_type = models.CharField(
        max_length=20,
        choices=[
            ('shipment_update', 'Atualização de Frete'),
            ('payment', 'Pagamento'),
            ('system', 'Sistema')
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'is_read']),
        ]

class LaunchNotificationRequest(models.Model):
    """Solicitação para ser notificado quando o app for lançado"""
    name = models.CharField(max_length=100, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    user_type = models.CharField(
        max_length=10,
        choices=[('cliente', 'Cliente'), ('motorista', 'Motorista')],
        default='cliente'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email or self.phone or 'Anônimo'
