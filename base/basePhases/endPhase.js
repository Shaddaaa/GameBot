const Phase = require("../phase.js");

class EndPhase extends Phase {
    constructor(room, nextPhase) {
        super(room, nextPhase);
    }
}

module.exports = EndPhase;