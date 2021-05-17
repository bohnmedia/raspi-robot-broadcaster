const Gpio = require('onoff').Gpio;

module.exports = class Robot {

    constructor() {

        this.gpios = [
            new Gpio(12, 'out'),
            new Gpio(16, 'out'),
            new Gpio(20, 'out'),
            new Gpio(21, 'out')
        ];

    }

    direction(direction) {

        const g = [0,0,0,0];
        const x = direction[0];
        const y = direction[1];

        // Geradeaus
        if (y === 1 && x === 0) {
            g[0] = 1;
            g[2] = 1;

        // Geradeaus rechts
        } else if (y === 1 && x === 1) {
            g[0] = 1;

        // Rechts
        } else if (y === 0 && x === 1) {
            g[0] = 1;
            g[3] = 1;

        // Rückwärts rechts
        } else if (y === -1 && x === 1) {
            g[1] = 1;

        // Rückwärts
        } else if (y === -1 && x === 0) {
            g[1] = 1;
            g[3] = 1;
        
        // Rückwärts links
        } else if (y === -1 && x === -1) {
            g[3] = 1;
        
        // Links
        } else if (y === 0 && x === -1) {
            g[1] = 1;
            g[2] = 1;

        // Geradeaus links
        } else if (y === 1 && x === -1) {
            g[2] = 1;

        }

        for (var i=0; i<g.length; i++) {
            this.gpios[i].writeSync(g[i]);
        }

    }

}