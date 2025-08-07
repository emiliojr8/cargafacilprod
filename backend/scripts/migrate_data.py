import os
import django
from django.contrib.gis.geos import Point

# Configuração do ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_config.settings')
django.setup()

from apps.old_dono_da_carga.models import (
    DonoDaCarga as OldUser,
    Motorista as OldDriver,
    Transporte as OldTransporte
)
from apps.accounts.models import User
from apps.clients.models import ClientProfile
from apps.drivers.models import DriverProfile
from apps.shipments.models import Shipment

def print_header(title):
    print(f"\n{'='*50}")
    print(f"{title.upper():^50}")
    print(f"{'='*50}")

def migrate_users():
    """Migra usuários do modelo antigo para accounts.User"""
    print_header("migrando usuários")
    
    for old_user in OldUser.objects.all():
        try:
            # Cria usuário base
            new_user = User.objects.create_user(
                username=old_user.username,
                password=old_user.password,  # Mantém hash
                email=old_user.email or f"{old_user.username}@temp.com",
                telefone=old_user.telefone,
                endereco=old_user.endereco,
                localizacao=old_user.localizacao,
                is_driver=hasattr(old_user, 'motorista'),
                is_client=not hasattr(old_user, 'motorista')  # Cliente por padrão
            )
            
            # Cria perfil específico
            if not hasattr(old_user, 'motorista'):
                ClientProfile.objects.create(user=new_user)
                print(f"C → {new_user.username}")
            else:
                print(f"D → {new_user.username}")

        except Exception as e:
            print(f"Erro em {old_user.username}: {str(e)}")

def migrate_drivers():
    """Migra dados específicos de motoristas"""
    print_header("migrando motoristas")
    
    for old_driver in OldDriver.objects.select_related('user').all():
        try:
            user = User.objects.get(username=old_driver.user.username)
            DriverProfile.objects.create(
                user=user,
                veiculo=old_driver.veiculo,
                capacidade_carga=old_driver.capacidade_carga,
                disponivel=old_driver.disponivel,
                latitude=old_driver.latitude,
                longitude=old_driver.longitude
            )
            print(f"Migrado: {user.username}")
        except Exception as e:
            print(f"Erro em motorista {old_driver.id}: {str(e)}")

def migrate_shipments():
    """Migra transportes para o novo modelo"""
    print_header("migrando transportes")
    
    for old in OldTransporte.objects.select_related('usuario', 'motorista__user').all():
        try:
            cliente = User.objects.get(username=old.usuario.username)
            motorista = None
            
            if old.motorista:
                motorista = User.objects.get(username=old.motorista.user.username)
            
            location = None
            if old.longitude and old.latitude:
                location = Point(old.longitude, old.latitude)
            
            Shipment.objects.create(
                cliente=cliente,
                motorista=motorista,
                origem=old.partida,
                destino=old.destino,
                status='completed' if old.data_criacao else 'pending',
                data_criacao=old.data_criacao,
                localizacao=location
            )
            print(f"Transporte {old.id} migrado")
        except Exception as e:
            print(f"Erro em transporte {old.id}: {str(e)}")

def verify_migration():
    """Verifica integridade dos dados migrados"""
    print_header("verificando migração")
    
    counts = [
        ('Usuários', OldUser, User),
        ('Motoristas', OldDriver, DriverProfile),
        ('Transportes', OldTransporte, Shipment)
    ]
    
    all_ok = True
    
    for name, old_model, new_model in counts:
        old_count = old_model.objects.count()
        new_count = new_model.objects.count()
        
        if old_count == new_count:
            print(f"✓ {name}: {old_count} = {new_count}")
        else:
            print(f"✗ {name}: {old_count} ≠ {new_count}")
            all_ok = False
    
    if all_ok:
        print("\nTODOS OS DADOS FORAM MIGRADOS COM SUCESSO!")
    else:
        print("\nATENÇÃO: Algumas contagens não coincidem. Verifique os logs.")

if __name__ == '__main__':
    migrate_users()
    migrate_drivers()
    migrate_shipments()
    verify_migration()