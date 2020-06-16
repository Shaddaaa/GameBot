const Discord = require("discord.js");
const fs = require("fs");

const MODULES_PATH = "modules";

class BotManager {
    constructor(token) {
        this.prefix = "!";
        this.botClient = new Discord.Client();
        this.modules = {};

        this.loadModules();

        this.botClient.on('ready', () => {
            console.log(`Logged in as ${this.botClient.user.tag}!`);
        });

        this.botClient.on('message', message => this.handleMessages(message));

        this.botClient.login(token);
    }

    loadModules() {
        const dir = fs.readdirSync(MODULES_PATH);
        console.log(dir);
        for (const dirent of dir) {
            let module = require("./" + MODULES_PATH + "/" + dirent);
            if (this.modules[module.prefix] != undefined) {
                //TODO log class
                console.log(module.prefix + " is defined twice or more!");
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
                module.onCommand(this.botClient, args, message);
            }
        }
    }
}

let botManager = new BotManager(process.argv[2]);

//botManager.handleMessages({content:"!test 1 und 2"});