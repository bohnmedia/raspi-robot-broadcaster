const Raspivid = require('raspivid');
const Splitter = require('stream-split');
const Stream = require('stream');
const EventEmitter = require('events');
const NALseparator = Buffer.from([0,0,0,1]);

module.exports = class Camera extends EventEmitter {

    constructor(options) {

        // Super constructor
        super();

        // Array für die ersten Frames
        this.firstFrames = [];

        // Starte die Kamera
        this.start(options);

    }

    // Starte die Kamera
    start(options) {

        // Referenziere die Klasse
        const self = this;

        Raspivid(options)
        .pipe(new Splitter(NALseparator))
        .pipe(new Stream.Transform({ transform: function (chunk, encoding, callback) {

            // Ermittle den Chunk-Type
            const chunkType = chunk[0] & 0b11111;

            // Ermittle die ersten SPS und PPS frames, die die Stream-Parameter beinhalten
            if (chunkType === 7 || chunkType === 8) {
                self.firstFrames.push(chunk);
            }

            // Sende Chunk-Event
            self.emit('chunk', chunk);

            // Alle Daten wurden verarbeitet
            callback();

        }}));

    }

}