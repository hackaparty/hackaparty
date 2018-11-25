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
        document.querySelector('.button.up').onmousedown = () => this.activateButton('up')
        document.querySelector('.button.down').onmousedown = () => this.activateButton('down')
        document.querySelector('.button.left').onmousedown = () => this.activateButton('left')
        document.querySelector('.button.right').onmousedown = () => this.activateButton('right')
        registerGyroskop(this.socket);
    }

    activateButton(dir)  {
        console.log(dir)
        document.querySelector('.button.' + dir).classList.add('active');
        this.sendMessage(dir)
        setTimeout(() => {
            document.querySelector('.button.' + dir).classList.remove('active');
        }, 1000)
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
    }
}

export default  example