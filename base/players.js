class Players {
    constructor() {
        this.playerMap = new Map();
    }
    
    addPlayer(player) {
        this.playerMap.set(player.userID, player);
    }

    removePlayerByID(userID) {
        this.playerMap.delete(userID);
    }

    getPlayerByID(userID) {
        return this.playerMap.get(userID);
    }

    getPlayerCount() {
        return this.playerMap.size;
    }
}

module.exports = Players;