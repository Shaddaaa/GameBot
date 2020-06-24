let Room = require("./room.js");

class Rooms{
    constructor() {
        this.roomByGuildID = new Map();
        this.roomByUserID = new Map();
    }

    createRoom(guildID, channelID, playerlimit, nextPhase) {
        let room = new Room(guildID, channelID, playerlimit, nextPhase);
        this.roomByGuildID.set(guildID, room);
    }

    hasPlayer(userID) {
        return this.roomByUserID.get(userID) != null;
    }

    getRoomByUserID(userID) {
        return this.roomByUserID.get(userID);
    }

    getRoomByGuildID(guildID) {
        return this.roomByGuildID.get(guildID);
    }

    join(player, guildID) {
        let room = this.getRoomByGuildID(guildID)
        if (room == null) {
            room = new Room(guildID);
            this.roomByGuildID.set(guildID, room);
        }
        if (room.phase.join == null)  {
            room.sendMessage("Currently not possible to join this room!");
            return;
        }
        this.roomByUserID.set(player.userID, room);
        room.phase.join(player);
    }

    leave(userID) {
        this.getRoomByUserID(userID).phase.leave(userID);
        this.roomByUserID.delete(userID);
    }
}

module.exports = Rooms;