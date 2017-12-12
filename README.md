# grafana-api-client
grafana http api

### run test
```shell
docker pull grafana/grafana
docker run -d --name=grafana -p 10001:3000 grafana/grafana
npm test
```