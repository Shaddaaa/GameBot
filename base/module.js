class Module {
    constructor(prefix, name, botManager) {
        this.prefix = prefix;
        this.name = name;
        this.botManager = botManager;
    }

    onCommand(args, message) {
        logger.warn("THIS SHOULD BE OVERWRITTEN BY ANY INHERITING CLASSES");
        botClient.channels.cache.get(message.channel.id).send("This module hasn't been implemented yet!");
    }
}
module.exports = Module;