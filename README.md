# Hackaparty

Getting the application from Docker Hub:
```
docker pull hackaparty/hackaparty
```

Running on Amazon EC2 in Docker:
```
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d hackaparty/hackaparty ./run http://`wget -qO- https://ipecho.net/plain ; echo`:8080/login
```

## Docker Hub:
[https://hub.docker.com/r/hackaparty/hackaparty/]

## Build for local Docker
```
docker build -t abc/hackaparty .
docker run -e DANGEROUSLY_DISABLE_HOST_CHECK -p 8080:8080 -p 3000:3000 -p 3001:3001 -d abc/hackaparty ./run http://<IP>:8080/login
```

## Run local environment
```
git clone https://github.com/hackaparty/hackaparty
cd hackaparty
npm install
./run http://IP:8080/login
```

or if you dont know your local network ip:

```
npm server local
```
the bash will show you where to startup and login

# Main endpoints for playing
http://IP:8080/startup for big display.

http://IP:8080/login for players.  This is the URL which is transformed in to QR code form to make it easy for the players to access it by simply opening it on their phone (iOS automatically detects QR codes).

# License (MIT)
MIT License

Copyright (c) 2018 Hackaparty Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.