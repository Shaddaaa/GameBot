const Module = require("./module.js");
const GamePhases = require("../model/GamePhases.js");
const Rooms = require("./rooms.js");

class GameModule extends Module {
    constructor(prefix, name, botManager) {
        super(prefix, name, botManager);
        this.isGameModule = true;
        this.rooms = new Rooms();
    }

    hasPlayer(userID) {
        return this.rooms.hasPlayer(userID);
    }

    onCommand(args, message) {
        let userID = message.author.id;
        let guildID = message.guild.id;
        if (this.hasPlayer(userID)) {
            if (args[0]=="leave") {
                this.rooms.leave(userID);
                return;
            }
            this.rooms.getRoomByUserID(userID).onCommand(args, message);
            return;
        }

        let curModule = this.botManager.getModuleOfPlayer(userID);
        if (curModule != null) {
            botClient.channels.cache.get(message.channel.id).send("<@" + message.author.id + "> you are already in a " + curModule.name + " room. You can leave with !" + curModule.prefix + " leave");
        }

        if (args[0]=="join") {
            if (this.rooms.getRoomByGuildID(guildID)==null) {
                this.rooms.createRoom(guildID, message.channel.id);
            }

            this.rooms.join(userID, guildID);
        }
    }
}

module.exports = GameModule;