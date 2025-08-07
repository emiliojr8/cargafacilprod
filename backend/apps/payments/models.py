from django.db import models
from django.conf import settings

class MpesaTransaction(models.Model):
    """Modelo para transações MPesa"""
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('completed', 'Completo'),
        ('failed', 'Falhou')
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_id = models.CharField(max_length=50, unique=True)
    status = models.CharField(
        max_length=15,
        choices=STATUS_CHOICES,
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Transação MPesa"
        verbose_name_plural = "Transações MPesa"
        ordering = ['-created_at']

    def __str__(self):
        return f"Transação #{self.id} - {self.phone_number}"