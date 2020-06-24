const Phase = require("../../base/phase.js");

class MainPhase extends Phase {
    constructor (room, nextPhase) {
        super(room, nextPhase);
        this.lastPlayer = null;
        this.lastValue = null;
    }

    onCommand(args, message) {
        if (this.lastPlayer == null) {
            if ((args[0] == "roll" || args[0] == "r" || args[0] == null)) {
                this.lastValue = this.roleDice(message.author.id);
                this.lastPlayer = message.author.id;
            }
        } else {
            if (this.lastPlayer != message.author.id) {
                let value = this.roleDice(message.author.id);
                if (this.lastValue > value) {
                    this.room.sendMessage("<@" + this.lastPlayer + "> won!");
                } else if (this.lastValue < value) {
                    this.room.sendMessage("<@" + message.author.id + "> won!");
                } else {
                    this.room.sendMessage("Draw!");
                }
                this.lastPlayer = null;
            }
        }
    }

    roleDice(userID) {
        let value = Math.floor(Math.random()*6) + 1;
        this.room.sendMessage("<@" + userID + "> rolled a " + value + "!");
        return value;
    }
}

module.exports = function () {
    this.phase = new MainPhase(this, null);
}