"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmd_1 = require("./cmd");
var cmd = [
    {
        commandTitle: "add",
        process: cmd_1.add
    },
    {
        commandTitle: "remove",
        process: cmd_1.remove
    }
];
var rt = [
    { reactName: "react to ready",
        eventType: "message",
        process: function (msg) { if (msg.content === "ready")
            msg.channel.send("REACT >"); }
    }
];
var BallonBurier = {
    functionName: "babu",
    commands: cmd,
    reacts: rt
};
exports.default = BallonBurier;
