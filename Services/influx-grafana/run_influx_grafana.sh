#!/bin/bash

echo "--- Running influxdb and grafana docker container ---"

docker run -d \
  --name docker-influxdb-grafana \
  -p 3003:3003 \
  -p 3004:8083 \
  -p 8086:8086 \
  -v influx-data:/var/lib/influxdb \
  -v grafana-data:/var/lib/grafana \
  para-influx-grafana:1.0
  