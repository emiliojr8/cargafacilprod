# web/backend/apps/notifications/services.py
import africastalking
from django.conf import settings

class SMSService:
    def __init__(self):
        # Inicializa o SDK
        africastalking.initialize(
            username=settings.AFRICASTALKING_CONFIG['USERNAME'],
            api_key=settings.AFRICASTALKING_CONFIG['API_KEY']
        )
        self.sms = africastalking.SMS

    def send_otp(self, phone: str, code: str) -> bool:
        """Envia OTP via SMS para números moçambicanos"""
        try:
            # Formata o número internacionalmente
            formatted_phone = self._format_phone(phone)
            
            # Mensagem localizada (português)
            message = f"Seu codigo CargaFacil: {code}. Valido por 5 minutos."
            
            # Envia o SMS
            response = self.sms.send(message, [formatted_phone])
            return response['SMSMessageData']['Recipients'][0]['status'] == 'Success'
        except Exception as e:
            print(f"Erro ao enviar SMS: {e}")
            return False

    def _format_phone(self, phone: str) -> str:
        """Formata números moçambicanos para o padrão internacional"""
        if phone.startswith('0'):
            return '+258' + phone[1:]  # Converte 84... para +25884...
        return phone if phone.startswith('+258') else f'+258{phone}'