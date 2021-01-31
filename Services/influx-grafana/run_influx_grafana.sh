#!/bin/bash

echo "--- Running influxdb and grafana docker container ---"

cwd=$PWD
influxPath="${cwd}/influx-data"
grafanaPath="${cwd}/grafana-data"
echo "Influx data path - $influxPath"  
echo "Grafana data path - $grafanaPath"  

echo "--- Executing docker run command ---"

set -x
docker run -d \
    --name docker-influxdb-grafana \
    -p 3003:3003 \
    -p 3004:8083 \
    -p 8086:8086 \
    -v $influxPath:/var/lib/influxdb \
    -v $grafanaPath:/var/lib/grafana \
    para-influx-grafana:1.0 
    