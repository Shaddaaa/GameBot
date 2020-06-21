const Phase = require("../phase.js");
const Player = require("../player.js");

class LobbyPhase extends Phase {
    constructor(room, nextPhase) {
        super(room, nextPhase);
    }

    generatePlayer(userID) {
        logger.warn("LobbyPhase.generatePlayer: This should be overwritten by any inheriting classes!");
        return new Player(userID);
    }
    
    join(userID) {
        super.join(userID);
        let player = this.generatePlayer(userID);
        this.room.players.addPlayer(player);
    }

}
module.exports = LobbyPhase;