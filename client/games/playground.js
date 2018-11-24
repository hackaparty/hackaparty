import controller from "./controller";

class playground {

    constructor() {
        this.teams = []
        this.initSocket()
        this.initDisplay()
        this.initControls()
    }


    initSocket() {
        this.socket = new WebSocket("ws://" + location.hostname + ":3001/controller");
        this.socket.onmessage = this.receiveMessage.bind(this);
    }

    sendMessage(message) {
        this.socket.send(message);
    }

    receiveMessage(message) {
      console.log(msg.data);
      if(msg.data === 'left'){
        if(this.bunny.x>0) {
          this.bunny.x -= 10;
        }
      }
      else if(msg.data === 'right'){
        if(this.bunny.x<800) {
          this.bunny.x += 10;
        }
      }
      else if(msg.data === 'up'){
        if(this.bunny.y > 0) {
          this.bunny.y -= 10;
        }
      }
      else if(msg.data === 'down'){
        if(this.bunny.y < 600) {
          this.bunny.y += 10;
        }
      }
    }

    initControls() {}

    initDisplay() {}

}

export default playground