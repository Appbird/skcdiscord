"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmd = [
    { commandTitle: ".",
        numberOfTokenRequired: 2,
        description: "文字列`OK> \\n 3 2 1 GO!>`を特定のチャンネルにメッセージとして投稿する。",
        argsForDescription: [], process: function (msg) { msg.channel.send("OK > \n 3,2,1 GO! >"); }
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
    realFuncName: "READY",
    commands: cmd,
    reacts: rt,
    description: "コマンドを打つと特定の文字列を出力するテスト機能。"
};
exports.default = Ready;
//# sourceMappingURL=Ready.js.map