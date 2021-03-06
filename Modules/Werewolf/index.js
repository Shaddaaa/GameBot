const GameModule = require("../../base/gameModule.js");
const Player = require("../../base/player.js");

class Werewolf extends GameModule {
    constructor(botManager) {
        super("ww", "werewolf", botManager, -1);
    }

    generatePlayer(userID) {
        //TODO: create and use WerewolfPlayer
        return new Player(userID);
    }
}

module.exports = Werewolf;