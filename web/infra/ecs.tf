# infra/ecs.tf
resource "aws_ecs_cluster" "cargafacil" {
  name = "cargafacil-cluster"
}

resource "aws_ecs_task_definition" "backend" {
  family                   = "backend"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "1024"
  memory                   = "2048"
  
  container_definitions = jsonencode([{
    name      = "backend",
    image     = "${aws_ecr_repository.backend.repository_url}:latest",
    portMappings = [{ containerPort = 8000 }]
  }])
}

resource "aws_alb_target_group" "backend" {
  port     = 8000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}