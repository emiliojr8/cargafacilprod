from rest_framework import serializers
from .models import Notification, LaunchNotificationRequest

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'is_read', 'notification_type', 'created_at']
        read_only_fields = fields

class LaunchNotificationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LaunchNotificationRequest
        fields = ['id', 'name', 'phone', 'email', 'user_type', 'created_at']
        read_only_fields = ['id', 'created_at']
