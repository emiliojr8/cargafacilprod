# backend/apps/accounts/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User
from apps.clients.models import ClientProfile
from apps.drivers.models import DriverProfile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User
    list_display = (
        'id', 'telefone', 'email', 'is_driver', 'is_client',
        'is_active', 'is_staff', 'is_superuser', 'date_joined'
    )
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'is_driver', 'is_client')
    search_fields = ('telefone', 'email')
    ordering = ('-date_joined',)
    readonly_fields = ('date_joined', 'last_login')

    fieldsets = (
        (None, {'fields': ('telefone', 'password')}),
        (_('Informações pessoais'), {'fields': ('email', 'foto', 'endereco', 'localizacao')}),
        (_('Tipo de usuário'), {'fields': ('is_driver', 'is_client')}),
        (_('Permissões'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Datas importantes'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'telefone', 'password1', 'password2',
                'email', 'is_driver', 'is_client',
                'is_active', 'is_staff', 'is_superuser',
            ),
        }),
    )

# Mostrar perfis vinculados também no admin

@admin.register(ClientProfile)
class ClientProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'nome', 'email', 'provincia', 'data_nascimento')
    search_fields = ('user__telefone', 'nome', 'email')
    raw_id_fields = ('user',)

@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'user', 'nome', 'email', 'provincia', 'veiculo',
        'capacidade_carga', 'numero_carta_conducao', 'data_nascimento'
    )
    search_fields = ('user__telefone', 'nome', 'email', 'numero_carta_conducao')
    raw_id_fields = ('user',)
