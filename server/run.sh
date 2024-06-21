docker-compose down
export REDIS_ENDPOINT=rediss://default:AcUHAAIncDE4OTM0MGNkODNkYWY0ZmUzODRlY2RmZThmZjVjMWVhY3AxNTA0Mzk@destined-osprey-50439.upstash.io:6379
export CORS_ORIGIN=http://localhost:3000
docker-compose up -d --build