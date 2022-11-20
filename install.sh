#!/bin/bash

echo "Wellcome to my installer!"

cd ./build

docker network inspect event_management >/dev/null 2>&1 || \
    docker network create --driver bridge event_management

docker compose -f db.yml -f broker.yml -f services.yml -f server.yml up -d
docker exec build-auth-service-1 npm run migration:run
docker exec build-event-service-1 npm run migration:run
docker exec build-notification-service-1 npm run migration:run

cd ..