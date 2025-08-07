# backend/locustfile.py
from locust import HttpUser, task, between

class CargaFacilUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def test_motoristas_proximos(self):
        self.client.get("/api/drivers/nearby?lat=-25.96&lng=32.58")