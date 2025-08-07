# backend/apps/accounts/urls_mobile.py
from django.urls import path
from .views import RequestOtpView, VerifyOtpView

urlpatterns = [
    path('request-otp/', RequestOtpView.as_view(), name='mobile_request_otp'),
    path('verify-otp/', VerifyOtpView.as_view(), name='mobile_verify_otp'),
]

