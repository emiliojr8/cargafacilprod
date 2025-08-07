from django.db import models
from django.contrib.gis.db.models import PointField
from apps.accounts.models import User

class Shipment(models.Model):
    """
    Modelo para transportes (antigo Transporte).
    """
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('accepted', 'Aceito'),
        ('in_transit', 'Em Trânsito'),
        ('completed', 'Concluído'),
        ('canceled', 'Cancelado'),
    ]
    
    cliente = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='shipments_as_client',
        limit_choices_to={'is_client': True}
    )
    motorista = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='shipments_as_driver',
        limit_choices_to={'is_driver': True}
    )
    origem = models.CharField(max_length=255)
    destino = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    data_criacao = models.DateTimeField(auto_now_add=True)
    localizacao = PointField(null=True, blank=True)

    class Meta:
        verbose_name = "Frete"
        verbose_name_plural = "Fretes"
        ordering = ['-data_criacao']

    def __str__(self):
        return f"Frete #{self.id} - {self.origem} → {self.destino}"