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
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d hackaparty/hackaparty ./run http://`wget -qO- https://ipecho.net/plain ; echo`:8080/login
```

## Docker Hub:
[https://hub.docker.com/r/hackaparty/hackaparty/]

## Build for local Docker
```
docker build -t abc/hackaparty .
```

## Run locally
```
./run http://IP:8080/login
```

# Main endpoints for playing
http://IP:8080/startup for big display.

http://IP:8080/login for players.  This is the URL which is transformed in to QR code form to make it easy for the players to access it by simply opening it on their phone (iOS automatically detects QR codes).