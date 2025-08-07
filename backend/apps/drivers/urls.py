from django.urls import path
from .views import (
    DriverRegistrationView,
    DriverLoginView,
    NearbyShipmentsView,
    DriverShipmentsView
)

urlpatterns = [
    path('register/', DriverRegistrationView.as_view(), name='driver-register'),
    path('login/', DriverLoginView.as_view(), name='driver-login'),
    path('shipments/nearby/', NearbyShipmentsView.as_view(), name='nearby-shipments'),
    path('shipments/', DriverShipmentsView.as_view(), name='driver-shipments'),
]
