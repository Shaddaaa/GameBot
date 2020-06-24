const Module = require("./module.js");
const GamePhases = require("../model/GamePhases.js");
const Rooms = require("./rooms.js");
const Player = require("./player.js");

class GameModule extends Module {
    constructor(prefix, name, botManager, playerlimit, nextPhase) {
        super(prefix, name, botManager);
        this.isGameModule = true;
        this.rooms = new Rooms();
        this.playerlimit = playerlimit;
        this.nextPhase = nextPhase;
    }

    hasPlayer(userID) {
        return this.rooms.hasPlayer(userID);
    }

    generatePlayer(userID) {
        logger.warn("GameModule.generatePlayer: This should be overwritten by any inheriting classes!");
        return new Player(userID);
    }

    onCommand(args, message) {
        let userID = message.author.id;
        let guildID = message.guild.id;
        logger.debug(this.hasPlayer(userID));
        if (this.hasPlayer(userID)) {
            if (args[0]=="leave") {
                this.rooms.leave(userID);
                return;
            }
            this.rooms.getRoomByUserID(userID).phase.onCommand(args, message);
            return;
        }

        let curModule = this.botManager.getModuleOfPlayer(userID);
        if (curModule != null) {
            botClient.channels.cache.get(message.channel.id).send("<@" + message.author.id + "> you are already in a " + curModule.name + " room. You can leave with \"!" + curModule.prefix + " leave\"");
            return;
        }
        if (args[0]=="join") {
            if (this.rooms.getRoomByGuildID(guildID)==null) {
                this.rooms.createRoom(guildID, message.channel.id, this.playerlimit, this.nextPhase);
            }

            this.rooms.join(this.generatePlayer(userID), guildID);
        }
    }
}

module.exports = GameModule;