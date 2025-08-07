import requests

session = requests.Session()
session.trust_env = False  # ignora proxies do sistema que podem forçar HTTPS

url = "http://localhost:8000/api/auth/web/register/"
data = {
    "nome": "João",
    "telefone": "25899999999",
    "senha": "senha123",
    "senha2": "senha123"
}

response = session.post(url, json=data)

print("Status:", response.status_code)
try:
    print("Resposta:", response.json())
except Exception:
    print("Resposta (texto):", response.text)
