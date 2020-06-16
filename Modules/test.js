const Module = require("../Module.js");

class Test extends Module {
    constructor() {
        super("test", "test");
    }

    onCommand(botClient, args, message) {
        console.log(args);
        let s = "";
        for (let arg of args) {
            s += arg + "\n";
        }
        botClient.channels.cache.get(message.channel.id).send("<@"+message.author.id+"> in the channel _" + message.channel.name + "_ sent the following arguments: \n" + s);
    }
}

module.exports = new Test();