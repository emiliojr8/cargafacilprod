# backend/apps/accounts/urls_web.py
from django.urls import path
from .views import RegistrationView, LoginView, UserProfileView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='web_register'),
    path('login/', LoginView.as_view(), name='web_login'),
    path('profile/', UserProfileView.as_view(), name='web_user_profile'),
]
