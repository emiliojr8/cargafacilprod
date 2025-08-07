from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from apps.accounts.models import User
from apps.clients.models import ClientProfile
from apps.drivers.models import DriverProfile
from django.contrib.auth import get_user_model
import logging
import re

User = get_user_model()
logger = logging.getLogger(__name__)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirmation = serializers.CharField(write_only=True, required=True)
    user_type = serializers.ChoiceField(write_only=True, required=True, choices=[('client', 'Cliente'), ('driver', 'Motorista')])

    # Campos adicionais
    nome = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(write_only=True, required=False, allow_blank=True)
    foto = serializers.ImageField(write_only=True, required=False, allow_null=True)
    data_nascimento = serializers.DateField(write_only=True, required=True)
    provincia = serializers.CharField(write_only=True, required=True)

    # Campos exclusivos para motoristas
    veiculo = serializers.CharField(write_only=True, required=False, allow_blank=True)
    capacidade_carga = serializers.CharField(write_only=True, required=False, allow_blank=True)
    numero_carta_conducao = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'telefone',
            'email',
            'foto',
            'password',
            'password_confirmation',
            'user_type',
            'nome',
            'data_nascimento',
            'provincia',
            'veiculo',
            'capacidade_carga',
            'numero_carta_conducao',
        ]

    def validate_telefone(self, value):
        if not value.startswith('258') or len(value) != 12:
            raise serializers.ValidationError("Número moçambicano inválido. Formato: 258XXXXXXXXX")
        if User.objects.filter(telefone=value).exists():
            raise serializers.ValidationError("Este número já está cadastrado")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError({'password_confirmation': 'As senhas não coincidem'})

        if not attrs.get('provincia'):
            raise serializers.ValidationError({'provincia': 'A província é obrigatória'})

        if attrs['user_type'] == 'driver':
            required_driver_fields = ['veiculo', 'capacidade_carga', 'numero_carta_conducao']
            for field in required_driver_fields:
                if not attrs.get(field):
                    raise serializers.ValidationError({field: f'O campo {field} é obrigatório para motoristas'})

            if not re.match(r'^\d{8}/\d{1}$', attrs['numero_carta_conducao']):
                raise serializers.ValidationError({'numero_carta_conducao': 'Formato inválido. Use: 12345678/1'})

        return attrs

    def create(self, validated_data):
        user_type = validated_data.pop('user_type')
        password = validated_data.pop('password')
        validated_data.pop('password_confirmation')

        nome = validated_data.pop('nome')
        email = validated_data.pop('email', None)
        foto = validated_data.pop('foto', None)
        data_nascimento = validated_data.pop('data_nascimento')
        provincia = validated_data.pop('provincia')

        veiculo = validated_data.pop('veiculo', None)
        capacidade_carga = validated_data.pop('capacidade_carga', None)
        numero_carta_conducao = validated_data.pop('numero_carta_conducao', None)

        user = User(
            **validated_data,
            email=email,
            is_driver=(user_type == 'driver'),
            is_client=(user_type == 'client')
        )
        if foto:
            user.foto = foto
        user.set_password(password)
        user.save()

        if user.is_driver:
            DriverProfile.objects.create(
                user=user,
                nome=nome,
                email=email,
                data_nascimento=data_nascimento,
                provincia=provincia,
                veiculo=veiculo,
                capacidade_carga=capacidade_carga,
                numero_carta_conducao=numero_carta_conducao
            )
        else:
            ClientProfile.objects.create(
                user=user,
                phone=user.telefone,
                nome=nome,
                email=email,
                data_nascimento=data_nascimento,
                provincia=provincia
            )

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    foto_url = serializers.SerializerMethodField()
    nome = serializers.CharField(required=False)
    data_nascimento = serializers.DateField(required=False)
    provincia = serializers.CharField(required=False)
    veiculo = serializers.CharField(required=False, allow_blank=True)
    capacidade_carga = serializers.CharField(required=False, allow_blank=True)
    numero_carta_conducao = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'telefone',
            'email',
            'foto_url',
            'is_driver',
            'is_client',
            'nome',
            'data_nascimento',
            'provincia',
            'veiculo',
            'capacidade_carga',
            'numero_carta_conducao',
        ]

    def get_foto_url(self, obj):
        request = self.context.get('request')
        if obj.foto and hasattr(obj.foto, 'url'):
            return request.build_absolute_uri(obj.foto.url)
        return None

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        profile = instance.driver_profile if instance.is_driver else instance.client_profile if instance.is_client else None
        if profile:
            rep['nome'] = getattr(profile, 'nome', None)
            rep['data_nascimento'] = getattr(profile, 'data_nascimento', None)
            rep['provincia'] = getattr(profile, 'provincia', None)
            rep['veiculo'] = getattr(profile, 'veiculo', None)
            rep['capacidade_carga'] = getattr(profile, 'capacidade_carga', None)
            rep['numero_carta_conducao'] = getattr(profile, 'numero_carta_conducao', None)
        return rep

    def update(self, instance, validated_data):
        print("DEBUG: Dados validados no update ->", validated_data)

        email = validated_data.get('email')
        if email:
            instance.email = email

        foto = self.context.get('request').data.get('foto')
        if foto:
            instance.foto = foto

        profile = None
        if instance.is_driver:
            profile = instance.driver_profile
        elif instance.is_client:
            profile = instance.client_profile

        if profile:
            for field in ['nome', 'data_nascimento', 'provincia', 'veiculo', 'capacidade_carga', 'numero_carta_conducao']:
                if field in validated_data and validated_data[field] not in [None, '', 'null']:
                    setattr(profile, field, validated_data[field])
            profile.save()

        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    telefone = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    user_type = serializers.ChoiceField(required=True, choices=[('client', 'Cliente'), ('driver', 'Motorista')])

    def validate(self, attrs):
        telefone = attrs.get('telefone')
        password = attrs.get('password')
        user_type = attrs.get('user_type')

        if not (telefone and password):
            raise serializers.ValidationError('Telefone e senha são obrigatórios')

        user = authenticate(
            request=self.context.get('request'),
            telefone=telefone,
            password=password
        )

        if not user:
            raise serializers.ValidationError('Credenciais inválidas')

        if user_type == 'driver' and not user.is_driver:
            raise serializers.ValidationError('Este usuário não é um motorista')

        if user_type == 'client' and not user.is_client:
            raise serializers.ValidationError('Este usuário não é um cliente')

        if not user.is_active:
            raise serializers.ValidationError('Esta conta está desativada')

        attrs['user'] = user
        return attrs
