require("./base/globals.js");
const fs = require("fs");

const MODULES_PATH = "modules";

class BotManager {
    constructor(token) {
        this.prefix = "!";
        this.modules = {};

        this.loadModules();

        botClient.on('ready', () => {
            logger.info(`Logged in as ${botClient.user.tag}!`);
        });

        botClient.on('message', message => this.handleMessages(message));

        botClient.login(token);
    }

    getModuleOfPlayer(userID) {
        for (let prefix in this.modules) {
            let module = this.modules[prefix];
            if (module.hasPlayer && module.hasPlayer(userID))
                return module;
        }
        return null;
    }

    loadModules() {
        const dir = fs.readdirSync(MODULES_PATH);
        for (const dirent of dir) {
            let ModuleClass = require("./" + MODULES_PATH + "/" + dirent);
            let module = new ModuleClass(this);
            if (this.modules[module.prefix] != undefined) {
                logger.fatal(module.prefix + " is defined twice!");
                process.exit();
            }
            this.modules[module.prefix] = module;
        }
    }

    handleMessages(message) {
        if (message.content.slice(0,this.prefix.length)!=this.prefix)
            return;
        
        //split the content into the command name and the args
        let args = message.content.slice(this.prefix.length).split(" ");
        let command = args.splice(0,1)[0];

        for (let [prefix, module] of Object.entries(this.modules)) {
            if (module.prefix===command) {
                module.onCommand(args, message);
            }
        }
    }
}

console.log(this);

let botManager = new BotManager(process.argv[2]);