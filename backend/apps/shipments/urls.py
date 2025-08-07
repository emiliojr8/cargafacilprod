# apps/shipments/urls.py
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MobileShipmentViewSet

router = DefaultRouter()
router.register(r'shipments', MobileShipmentViewSet, basename='shipments')

urlpatterns = router.urls