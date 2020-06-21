const LobbyPhase = require("./basePhases/lobbyPhase.js");
const Players = require("./players.js");

class Room {
    constructor(guildID, channelID) {
        this.players = new Players();
        this.guildID = guildID;
        this.channelID = channelID;
        this.phase = new LobbyPhase(this);
    }
}

module.exports = Room;