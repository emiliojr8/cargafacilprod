# backend/scripts/fix_migrations.py
"""
Script para corrigir problemas de migração e fazer backup seguro
"""

import os
import django
from django.core import serializers

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_config.settings')
django.setup()

def safe_dumpdata():
    """
    Faz backup dos dados de forma segura, tratando possíveis erros
    """
    try:
        from apps.old_dono_da_carga.models import DonoDaCarga, Motorista, Transporte
        
        # Serializa cada modelo separadamente
        with open('backup_usuarios.json', 'w') as f:
            serializers.serialize('json', DonoDaCarga.objects.all(), stream=f)
        
        with open('backup_motoristas.json', 'w') as f:
            serializers.serialize('json', Motorista.objects.all(), stream=f)
            
        with open('backup_transportes.json', 'w') as f:
            serializers.serialize('json', Transporte.objects.all(), stream=f)
            
        print("Backup realizado com sucesso em 3 arquivos separados!")
    except Exception as e:
        print(f"Erro ao fazer backup: {str(e)}")
        print("Você pode precisar recriar o banco de dados do zero")

if __name__ == '__main__':
    safe_dumpdata()