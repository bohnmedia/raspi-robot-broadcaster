const Camera = require('./Camera');
const WebSocketClient = require('./WebSocketClient');
const Robot = require('./Robot');

module.exports = class Broadcaster {

    constructor(options) {

        this.robot = new Robot();
        this.camera = new Camera(options.video);
        this.ws = new WebSocketClient(options.websocket);

        this.ws.socket.on("connect", () => {

            this.camera.firstFrames.forEach(chunk => {
                this.ws.socket.emit('video', chunk);
            });

        });

        // Chunk von der Kamera
        // --------------------
        // Beinhaltet auch Chunks vom Typ 5, 7 und 8

        this.camera.on('chunk', chunk => {
            this.ws.socket.emit('video', chunk);
        });

        // Erhalte Richtungssignal
        this.ws.socket.on('direction', direction => {
            this.robot.direction(direction);
        });

    }

}