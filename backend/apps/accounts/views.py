# apps/accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegistrationSerializer, LoginSerializer, UserProfileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
import logging
import random
from django.core.cache import cache
from django.contrib.auth.hashers import make_password
from apps.accounts.models import User
from .serializers import LoginSerializer, UserProfileSerializer


# Configuração do logger
logger = logging.getLogger(__name__)


class RegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        print("\n🔥 REQUEST DATA:", request.data, "\n")
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            logger.info(f"Cadastro realizado para usuário: {user.telefone} (Driver: {user.is_driver})")
            return Response({
                'token': str(refresh.access_token),
                'refresh': str(refresh),
                'user_id': user.id,
                'user_type': 'driver' if user.is_driver else 'client'
            }, status=status.HTTP_201_CREATED)

        logger.error(f"Erro de validação no cadastro: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            logger.warning(f"Tentativa de login inválida: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        logger.info(f"Login realizado para usuário: {user.telefone} (Driver: {user.is_driver})")

        # Serializa o usuário para enviar os dados do perfil
        profile_serializer = UserProfileSerializer(user, context={'request': request})

        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': user.id,
            'user_type': 'driver' if user.is_driver else 'client',
            'telefone': user.telefone,
            'profile': profile_serializer.data
        })



class RequestOtpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        phone = request.data.get('phone', '').replace('+', '').strip()

        if not phone.startswith('258') or len(phone) != 12:
            return Response(
                {'telefone': ['Número moçambicano inválido. Formato: 258XXXXXXXXX']},
                status=status.HTTP_400_BAD_REQUEST
            )

        otp = str(random.randint(100000, 999999))
        cache_key = f'otp_{phone}'

        print(f"\nOTP GERADO PARA {phone}: {otp}\n")

        try:
            cache.set(cache_key, otp, timeout=300)
            return Response(
                {
                    'message': 'Código OTP gerado com sucesso',
                    'debug_otp': otp
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            logger.error(f"Erro ao gerar OTP: {str(e)}")
            return Response(
                {'non_field_errors': ['Falha no sistema de verificação']},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class VerifyOtpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        phone = request.data.get('phone', '').replace('+', '').strip()
        code = request.data.get('code', '').strip()

        if not phone or not code:
            return Response(
                {'non_field_errors': ['Telefone e código são obrigatórios']},
                status=status.HTTP_400_BAD_REQUEST
            )

        cached_otp = cache.get(f'otp_{phone}')

        if not cached_otp or cached_otp != code:
            return Response(
                {'non_field_errors': ['Código inválido ou expirado']},
                status=status.HTTP_400_BAD_REQUEST
            )

        user, created = User.objects.get_or_create(
            telefone=phone,
            defaults={
                'username': f'user_{phone}',
                'is_active': True,
                'password': make_password(None)
            }
        )

        refresh = RefreshToken.for_user(user)
        return Response({
            'token': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': user.id,
            'is_new_user': created
        }, status=status.HTTP_200_OK)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = User.objects.select_related('driver_profile', 'client_profile').get(id=request.user.id)
        serializer = UserProfileSerializer(user, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        user = User.objects.select_related('driver_profile', 'client_profile').get(id=request.user.id)
        serializer = UserProfileSerializer(user, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(UserProfileSerializer(user, context={'request': request}).data)
        logger.warning(f"Erro ao atualizar perfil: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
