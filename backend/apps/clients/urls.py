from django.urls import path
from .views import AvailableDriversView, ListShipmentsView

urlpatterns = [
    path('drivers/available/', AvailableDriversView.as_view()),
    path('shipments/', ListShipmentsView.as_view()),
]