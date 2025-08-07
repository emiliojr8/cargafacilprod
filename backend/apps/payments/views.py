from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MpesaTransaction

class MpesaPaymentView(APIView):
    def post(self, request):
        try:
            phone = request.data.get('phone')
            amount = request.data.get('amount')
            
            if not phone or not amount:
                return Response(
                    {"error": "Número de telefone e valor são obrigatórios"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            transaction = MpesaTransaction.objects.create(
                user=request.user,
                phone_number=phone,
                amount=amount,
                transaction_id=f"MPESA_{MpesaTransaction.objects.count() + 1}"
            )
            
            return Response({
                "status": "success",
                "transaction_id": transaction.transaction_id
            }, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )