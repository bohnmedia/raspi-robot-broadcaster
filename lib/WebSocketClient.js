const io = require('socket.io-client');

module.exports = class WebSocketClient {

    constructor(options) {

        // Die Verbindung zum Server wird hergestellt.
        // Ein gültiger AuthToken erlaubt das Streamen von
        // Videos und das Empfangen von Steuersignalen.
        this.socket = io(options.server, {
            auth: {
                room: options.room,
                token: options.authToken
            }
        });

        this.socket.on("connect", () => {
            console.log('Connected to ' + options.server);
        });

        this.socket.on("connect_error", (err) => {
            console.log(err.message);
        });

    }



}