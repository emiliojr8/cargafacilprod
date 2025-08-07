from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet, LaunchNotificationRequestViewSet

router = DefaultRouter()
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'launch-requests', LaunchNotificationRequestViewSet, basename='launch-request')

urlpatterns = router.urls
    