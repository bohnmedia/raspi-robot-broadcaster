const Broadcaster = require('./lib/Broadcaster');
const config = JSON.parse(require('fs').readFileSync('config.json'));

const broadcaster = new Broadcaster({
    video: {
        width: 1280,
        height: 720,
        framerate: 20,
        profile: 'baseline',
        timeout: 0
    },
    websocket: {
        server: 'https://robot.bohn.media',
        room: 'uturm',
        authToken: 'eeI0YUjAaLAwss2TbVOtpaZKLOc6abfcgB50ZuwI2WMzIzTC9YzkJrYiIk83R8f1'
    }
});