"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmd = [
    { commandTitle: ".",
        process: function (msg) { msg.channel.send("OK > \n 3,2,1 GO! >"); }
    }
];
var rt = [{
        reactName: "react to ready",
        eventType: "message",
        process: function (msg) { if (msg.content === "ready")
            msg.channel.send("REACT >"); }
    }];
/**
 * Ready function
 * https://scrapbox.io/minimumAppbirdlications/SKcDiscordServant%2FReady
 */
var Ready = {
    functionName: "ready",
    commands: cmd,
    reacts: rt
};
exports.default = Ready;
