module.exports = function() {
    const Util = require("util");
    const createDebugger = require("pino");
    const Discord = require("discord.js");

    global.logger = createDebugger({level:"debug"});
    global.botClient = new Discord.Client();
    global.inspect = function(obj, args) { 
        return "\n" + Util.inspect(obj, args);
    }
}();