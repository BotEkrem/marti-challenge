docker build -t area-module -f ./devops/docker/area-module.dockerfile .
docker build -t auth-module -f ./devops/docker/auth-module.dockerfile .
docker build -t location-module -f ./devops/docker/location-module.dockerfile .
docker build -t logging-module -f ./devops/docker/logging-module.dockerfile .