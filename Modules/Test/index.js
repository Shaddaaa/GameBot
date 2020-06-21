const Module = require("../../base/module.js");
const Lobby = require("../../base/lobby.js");


class Test extends Module {
    constructor(botManager) {
        super("test", "test", botManager);
    }

    onCommand(args, message) {
        console.log(args);
        let s = "";
        for (let arg of args) {
            s += arg + "\n";
        }
        botClient.channels.cache.get(message.channel.id).send("<@"+message.author.id+"> in the channel _" + message.channel.name + "_ sent the following arguments: \n" + s);
    }

    createLobby() {
        this.lobby = new Lobby();
    }
}

module.exports = Test;