const Broadcaster = require('./lib/Broadcaster');

const broadcaster = new Broadcaster({
    video: {
        width: 960,
        height: 540,
        framerate: 20,
        profile: 'baseline',
        timeout: 0
    },
    websocket: {
        server: 'https://robot.bohn.media',
        authToken: 'RzDQOtxN9E2fW8iOk51spw9GftgKPDEgQxZ9uRbA7T0q4YaA7kKRKJWquDpqZlEG'
    }
});