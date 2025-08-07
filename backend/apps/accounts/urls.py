# backend/apps/accounts/urls.py
from django.urls import path, include

urlpatterns = [
    path('web/', include('apps.accounts.urls_web')),     # /api/auth/web/
    path('mobile/', include('apps.accounts.urls_mobile'))  # /api/auth/mobile/
]

