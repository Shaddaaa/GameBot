const Phase = require("../phase.js");

class LobbyPhase extends Phase {
    constructor(room, nextPhase, playerlimit) {
        super(room, nextPhase);
        this.playerlimit = playerlimit;
    }

    onCommand(args, message) {
        if (args[0] == "start") {
            this.nextPhase.call(this.room);
            this.room.sendMessage("Game started!");
            return;
        }
    }

    generatePlayer(userID) {
        logger.warn("LobbyPhase.generatePlayer: This should be overwritten by any inheriting classes!");
        return new Player(userID);
    }
    
    join(player) {
        let playercount = this.room.getPlayerCount();
        if (this.playerlimit != -1 && playercount >= this.playerlimit) {
            this.room.sendMessage("This room is full! (" + playercount + "/" + this.playerlimit + ")");
            return;
        }
        this.room.sendMessage("<@" + player.userID + "> joined the lobby!");
        this.room.players.addPlayer(player);
    }

}
module.exports = LobbyPhase;