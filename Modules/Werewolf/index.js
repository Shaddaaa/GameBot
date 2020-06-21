const GameModule = require("../../base/gameModule.js");

class Werewolf extends GameModule {
    constructor(botManager) {
        super("ww", "werewolf", botManager);
    }
}

module.exports = Werewolf;