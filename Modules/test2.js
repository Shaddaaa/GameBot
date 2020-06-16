const Module = require("../Module.js");

class Test2 extends Module {
    constructor() {
        super("ttt", "test2");
    }
}

module.exports = new Test2();