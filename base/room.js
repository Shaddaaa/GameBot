const LobbyPhase = require("./basePhases/lobbyPhase.js");
const Players = require("./players.js");

class Room {
    constructor(guildID, channelID, playerlimit, nextPhase) {
        this.players = new Players();
        this.guildID = guildID;
        this.channelID = channelID;
        this.phase = new LobbyPhase(this, nextPhase, playerlimit);
    }

    sendMessage(message) {
        botClient.channels.cache.get(this.channelID).send(message);
    }

    getPlayerCount() {
        return this.players.getPlayerCount();
    }
}

module.exports = Room;