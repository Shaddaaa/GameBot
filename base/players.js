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
        this.playerMap.get(userID);
    }
}

module.exports = Players;