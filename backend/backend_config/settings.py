"""
Django settings for backend_config project.
Configuração otimizada para produção com Conda e .env
"""

import os
import sys
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# ==============================================================================
# PATH CONFIGURATION
# ==============================================================================

BASE_DIR = Path(__file__).resolve().parent.parent

sys.path.insert(0, str(BASE_DIR))
sys.path.insert(0, str(BASE_DIR / 'apps'))
sys.path.insert(0, str(BASE_DIR / 'backend_config'))

# Load environment variables
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Sobrescreve se estiver em produção
if os.getenv('DJANGO_ENV') == 'production':
    load_dotenv(os.path.join(BASE_DIR, '.env.production'), override=True)


# ==============================================================================
# GDAL CONFIGURATION FOR CONDA
# ==============================================================================

conda_prefix = os.environ.get('CONDA_PREFIX')
if conda_prefix:
    os.environ['GDAL_DATA'] = os.path.join(conda_prefix, 'Library', 'share', 'gdal')
    os.environ['PROJ_LIB'] = os.path.join(conda_prefix, 'Library', 'share', 'proj')
    os.environ['PATH'] = f"{os.path.join(conda_prefix, 'Library', 'bin')};{os.environ['PATH']}"
    GDAL_LIBRARY_PATH = os.path.join(conda_prefix, 'Library', 'bin', 'gdal.dll')
    GEOS_LIBRARY_PATH = os.path.join(conda_prefix, 'Library', 'bin', 'geos_c.dll')

# ==============================================================================
# CORE SETTINGS
# ==============================================================================

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-dev-key-only')
# DEBUG = os.getenv('DEBUG')
DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')
#SECURE_SSL_REDIRECT = False
SECURE_SSL_REDIRECT = not DEBUG


ALLOWED_HOSTS_ENV = os.getenv('ALLOWED_HOSTS', '127.0.0.1')
ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_ENV.split(',') if host.strip()]

# ==============================================================================
# APPLICATION CONFIGURATION
# ==============================================================================

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',

    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'rest_framework_gis',
    'drf_spectacular',

    'apps.accounts.apps.AccountsConfig',
    'apps.clients.apps.ClientsConfig',
    'apps.drivers.apps.DriversConfig',
    'apps.shipments.apps.ShipmentsConfig',
    'apps.payments.apps.PaymentsConfig',
    'apps.notifications.apps.NotificationsConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend_config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend_config.wsgi.application'


# ==============================================================================
# DATABASE CONFIGURATION
# ==============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
       'HOST': os.getenv('DB_HOST'),
       'PORT': os.getenv('DB_PORT'),
   }
}


#DATABASES = {
#     'default': {
#         'ENGINE': 'django.contrib.gis.db.backends.postgis',
#         'NAME': 'cargafacil_prod',
#         'USER': 'EmilioJr_Admin',
#         # 'PASSWORD': 'pzd@d0ssss',
#         'PASSWORD': 'pzd@d0s',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
#}

# ==============================================================================
# AUTHENTICATION
# ==============================================================================

AUTH_USER_MODEL = 'accounts.User'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ==============================================================================
# INTERNATIONALIZATION
# ==============================================================================

LANGUAGE_CODE = 'pt-pt'
TIME_ZONE = 'Africa/Maputo'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# ==============================================================================
# STATIC & MEDIA FILES
# ==============================================================================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ==============================================================================
# REST FRAMEWORK
# ==============================================================================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
    }
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=120),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,  # Desativar rotação
    'BLACKLIST_AFTER_ROTATION': False,  # Não precisa blacklisting automático
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}


# ==============================================================================
# CORS & SECURITY
# ==============================================================================

#CORS_ALLOW_ALL_ORIGINS = True
#CORS_ALLOWED_ORIGINS = [
 #   "http://localhost:3000", # React Native Local
  #  "http://127.0.0.1:3000", # Alternativa localhost
   # "http://192.168.43.132:19000", # Expo Web local
    #"exp://192.168.43.132:19000", # Expo Go via deep link
    #"http://localhost:19006", # Expo dev tools
    #"http://localhost:8083", # Porta alternativa (talvez Metro bundler
    #"http://192.168.43.132:8083", # Mesmo em IP da rede
#]

CORS_ALLOWED_ORIGINS = [
    "https://cargafacil.co.mz",
    "https://app.cargafacil.co.mz"
]


CORS_ALLOW_CREDENTIALS = True

if not DEBUG:
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# ==============================================================================
# LOGGING CONFIGURATION
# ==============================================================================

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': BASE_DIR / 'debug.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django.db.backends': {
            'level': 'DEBUG',
            'handlers': ['console'],
        },
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'apps.accounts': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'DEBUG' if DEBUG else 'INFO',
    }
}

# ==============================================================================
# THIRD-PARTY SERVICES CONFIGURATION
# ==============================================================================

AFRICASTALKING_CONFIG = {
    'USERNAME': os.getenv('AT_USERNAME'),
    'API_KEY': os.getenv('AT_API_KEY'),
    'SENDER_ID': os.getenv('AT_SENDER_ID'),
    'IS_SANDBOX': os.getenv('AT_IS_SANDBOX', 'true').lower() in ('true', '1'),
}


# email em producao

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER


