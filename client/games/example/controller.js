import controller from '../controller'
import registerGyroskop from './controller.events.gyro'

class example extends controller {
    constructor() {
        super()
    }

    setTitle() {
        this.title = 'example'
    }

    initControls() {
        document.querySelector('.button.up').onmousedown = () => this.sendMessage('up')
        document.querySelector('.button.down').onmousedown = () => this.sendMessage('down')
        document.querySelector('.button.left').onmousedown = () => this.sendMessage('left')
        document.querySelector('.button.right').onmousedown = () => this.sendMessage('right')
        registerGyroskop(this.socket);
        document.querySelector('.button.down').onmousedown = () => this.sendMessage('down')
    }

    receiveMessage(message) {
        let data = JSON.parse(message.data)
        let {team, name} = data
        const colors = {
            red: '#FE6A6A',
            blue: '#72D7D1',
            yellow: '#FBF34C',
            green: '#02f410'
        }

        document.querySelector('.team-name').innerHTML = team.toUpperCase()
        document.querySelector('.user-name').innerHTML = name
        document.querySelector('.team-icon').style = 'background-color:' + colors[team.toLowerCase()]
        console.log(data)

    }
}

export default  example