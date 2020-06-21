const Module = require("../../base/module.js");

class Test2 extends Module {
    constructor(botManager) {
        super("ttt", "test2", botManager);
    }
}

module.exports = Test2;