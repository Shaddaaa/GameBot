const GamePhases = require("../model/GamePhases.js");

class Phase {
    constructor(room, nextPhase) {
        this.type = GamePhases.UNDEFINED;
        this.room = room;
        this.nextPhase = nextPhase;
    }

    onCommand(args, message) {
        logger.warn("Phase.onCommand: This should be overwritten by any inheriting classes!");
    }

    leave(userID) {
        this.room.players.removePlayerByID(userID);
        botClient.channels.cache.get(this.room.channelID).send("<@" + userID + "> left the lobby!");
    }

    join(userID) {
        botClient.channels.cache.get(this.room.channelID).send("<@" + userID + "> joined the lobby!");
    }
}

module.exports = Phase;