from django.db import models
from django.contrib.gis.db.models import PointField
from apps.accounts.models import User

class DriverProfile(models.Model):
    class Meta:
        app_label = 'drivers'
        db_table = 'drivers_driverprofile'
        verbose_name = "Perfil de Motorista"
        verbose_name_plural = "Perfis de Motoristas"

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='driver_profile',
        limit_choices_to={'is_driver': True}
    )
    nome = models.CharField(
        max_length=100,
        verbose_name="Nome completo"
    )
    email = models.EmailField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Email do motorista"
    )
    data_nascimento = models.DateField(
        verbose_name="Data de nascimento",
        null=True,
        blank=True
    )
    provincia = models.CharField(
        max_length=50,
        verbose_name="Província",
        null=True,
        blank=True
    )
    veiculo = models.CharField(
        max_length=100,
        verbose_name="Tipo de Veículo"
    )
    capacidade_carga = models.FloatField(
        verbose_name="Capacidade (kg)"
    )
    numero_carta_conducao = models.CharField(
        max_length=20,
        verbose_name="Número da Carta de Condução"
    )
    disponivel = models.BooleanField(
        default=True,
        verbose_name="Disponível para fretes?"
    )
    avaliacao = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Avaliação Média"
    )
    localizacao = PointField(
        null=True,
        blank=True,
        verbose_name="Localização Atual"
    )
    data_cadastro = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data de Cadastro"
    )

    def __str__(self):
        return f"{self.user.telefone} - {self.veiculo}"

    def save(self, *args, **kwargs):
        if not self.user.is_driver:
            self.user.is_driver = True
            self.user.is_client = False
            self.user.save()
        if not self.email:
            self.email = self.user.email
        super().save(*args, **kwargs)
