# backend/apps/accounts/models.py
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.gis.db.models import PointField
from django.utils.translation import gettext_lazy as _

# Validador de telefone: aceita +258 ou 258, seguido de 9 dígitos
telefone_validator = RegexValidator(
    regex=r'^(\+?258)\d{9}$',
    message="O número de telefone deve estar no formato +258XXXXXXXXX ou 258XXXXXXXXX."
)


class UserManager(BaseUserManager):
    def create_user(self, telefone, password=None, **extra_fields):
        if not telefone:
            raise ValueError("O campo 'telefone' é obrigatório.")
        extra_fields.setdefault('is_active', True)
        user = self.model(telefone=telefone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, telefone, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuário precisa ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuário precisa ter is_superuser=True.')

        return self.create_user(telefone, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        app_label = 'accounts'
        db_table = 'accounts_user'
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'

    telefone = models.CharField(
        max_length=15,
        unique=True,
        validators=[telefone_validator],
        help_text="Número no formato +258XXXXXXXXX ou 258XXXXXXXXX"
    )
    email = models.EmailField(
        max_length=255,
        unique=True,
        null=True,
        blank=True,
        help_text="Email do usuário"
    )
    endereco = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )
    localizacao = PointField(
        null=True,
        blank=True,
        help_text="Coordenadas geográficas do usuário"
    )
    foto = models.ImageField(
        upload_to='users/fotos/',  # As imagens irão para MEDIA_ROOT/users/fotos/
        null=True,
        blank=True,
        verbose_name=_("Foto do usuário")
    )
    is_driver = models.BooleanField(
        default=False,
        verbose_name="É motorista?"
    )
    is_client = models.BooleanField(
        default=True,
        verbose_name="É cliente?"
    )
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'telefone'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return f"{self.telefone} ({'Motorista' if self.is_driver else 'Cliente'})"

    def save(self, *args, **kwargs):
        # Remove o "+" do número de telefone para salvar padronizado
        if self.telefone.startswith('+'):
            self.telefone = self.telefone[1:]
        if self.is_driver:
            self.is_client = False
        super().save(*args, **kwargs)
