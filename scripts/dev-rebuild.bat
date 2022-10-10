@echo off
docker-compose -f devops/docker-compose-dev.yml -p networkbot up --build -d %*