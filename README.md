# Hackaparty

Getting the application:
```
docker pull hackaparty/hackaparty
```

Running locally:
```
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d hackaparty/hackaparty ./run http://<IP>:8080/login
```

Running on Amazon in Docker:
```
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d hackaparty/hackaparty ./run http://`wget -qO- https://ipecho.net/plain ; echo`/login
```

## Docker Hub:
[https://hub.docker.com/r/hackaparty/hackaparty/]
