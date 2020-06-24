const GameModule = require("../../base/gameModule.js");
const Player = require("../../base/player.js");
const nextPhase = require("./mainPhase.js");

class Werewolf extends GameModule {
    constructor(botManager) {
        super("dg", "dice game", botManager, 2, nextPhase);
    }

    generatePlayer(userID) {
        return new Player(userID);
    }
}

module.exports = Werewolf;