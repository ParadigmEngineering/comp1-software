### Influx / Grafana Docker

#### Prerequisites
- Docker

#### Build Image from Dockerfile
From this directory, build the container with:

```
docker build -t para-influx-grafana:1.0 docker
```
#### Run Docker Image - First Time
From this directory, run the container using the shell script with:

```
./run_influx_grafana.sh  
```

#### Stop/Start Docker Image 
To stop the container:

```
docker stop docker-influxdb-grafana
```

To start the container:
```
docker start docker-influxdb-grafana
```

#### References
This dockerfile was pulled from dockerhub for our use.

Refer to: https://github.com/philhawthorne/docker-influxdb-grafana for more info

Also, docker/README.md has more information about accessing influx after starting the container.
