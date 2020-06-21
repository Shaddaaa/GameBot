const Module = require("../../base/module.js");
const https = require('https');

class WatchTogether extends Module {
    constructor(botManager) {
        super("w2g", "watchtogether", botManager);
    }
    onCommand(args, message) {
        let options = {
            method: "POST"
        }
        let req = https.request("https://www.watch2gether.com/rooms/create", options, (res) => {
            res.setEncoding('utf8');
            let data = "";
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                let query = '<a href="';
                let index = data.indexOf(query);
                let link = data.slice(index+query.length);
                link = link.slice(0, link.indexOf("?lang=en"));
                botClient.channels.cache.get(message.channel.id).send(link);
                console.log(link);
            });
            res.on('error', (err) => {console.log("Error in watch2gether https")});
        }).end();
    }
}

module.exports = WatchTogether;