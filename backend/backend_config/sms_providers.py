# web/backend/config/sms_providers.py
from enum import Enum

class SMSProvider(Enum):
    AFRICASTALKING = 1
    TWILIO = 2
    VODACOM_API = 3