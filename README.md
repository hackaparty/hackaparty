# Hackaparty

```
docker pull hackaparty/hackaparty
```

```
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d hackaparty/hackaparty ./run http://<PUBLIC_IP>:8080/login
```