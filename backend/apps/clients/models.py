from django.db import models
from apps.accounts.models import User

class ClientProfile(models.Model):
    class Meta:
        app_label = 'clients'
        db_table = 'clients_clientprofile'
        verbose_name = "Perfil de Cliente"
        verbose_name_plural = "Perfis de Clientes"

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='client_profile',
        limit_choices_to={'is_client': True}
    )
    phone = models.CharField(
        max_length=15,
        blank=True,
        null=True,
        help_text="Telefone de contato alternativo"
    )
    nome = models.CharField(
        max_length=100,
        verbose_name="Nome completo"
    )
    email = models.EmailField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Email do cliente"
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
    preferencias = models.JSONField(
        blank=True,
        null=True,
        help_text="Preferências de transporte do cliente"
    )
    data_cadastro = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Data de Cadastro"
    )
    ativo = models.BooleanField(
        default=True,
        verbose_name="Conta ativa?"
    )

    def __str__(self):
        return f"Perfil de {self.user.telefone}"

    def save(self, *args, **kwargs):
        if not self.phone:
            self.phone = self.user.telefone
        if not self.email:
            self.email = self.user.email
        super().save(*args, **kwargs)
