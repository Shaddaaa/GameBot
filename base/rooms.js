let Room = require("./room.js");

class Rooms{
    constructor() {
        this.roomByGuildID = new Map();
        this.roomByUserID = new Map();
    }

    createRoom(guildID, channelID) {
        let room = new Room(guildID, channelID);
        this.roomByGuildID.set(guildID, room);
    }

    hasPlayer(userID) {
        return this.roomByUserID.get(userID);
    }

    getRoomByUserID(userID) {
        return this.roomByUserID.get(userID);
    }

    getRoomByGuildID(guildID) {
        return this.roomByGuildID.get(guildID);
    }

    join(userID, guildID) {
        if (!this.getRoomByGuildID(guildID)) {
            let room = new Room(guildID);
            this.roomByGuildID.set(guildID, room);
        }
        this.roomByUserID.set(userID, this.getRoomByGuildID(guildID));
        this.getRoomByGuildID(guildID).phase.join(userID);
    }

    leave(userID) {
        this.getRoomByUserID(userID).phase.leave(userID);
        this.roomByUserID.delete(userID);
    }
}

module.exports = Rooms;