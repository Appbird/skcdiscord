"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cmd_1 = require("./cmd");
var react_1 = __importDefault(require("./react"));
var TargetWordFragManager_1 = __importDefault(require("./Base/TargetWordFragManager"));
var cmd = [
    {
        commandTitle: "add",
        allowedFlags: (new TargetWordFragManager_1.default()).definedCmdFlags,
        numberOfTokenRequired: 3,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u306B`[\u6587\u5B57\u5217A]`\u3092\u767B\u9332\u3059\u308B\u3002",
        argsForDescription: ["[文字列A]", "[フラグ]"],
        process: cmd_1.add
    },
    {
        commandTitle: "remove",
        numberOfTokenRequired: 3,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u306B\u3042\u308B`[\u6587\u5B57\u5217A]`\u3092\u524A\u9664\u3059\u308B\u3002",
        argsForDescription: ["[文字列A]"],
        process: cmd_1.remove
    },
    {
        commandTitle: "show",
        numberOfTokenRequired: 2,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u3092bot\u306B\u30E1\u30C3\u30BB\u30FC\u30B8\u3068\u3057\u3066\u51FA\u529B\u3055\u305B\u308B\u3002",
        argsForDescription: [],
        process: cmd_1.show
    }
];
var rt = [
    {
        eventType: "message",
        reactName: "buryWord",
        process: react_1.default
    }
];
var BallonBurier = {
    functionName: "babu",
    realFuncName: "BalloonBurier",
    commands: cmd,
    reacts: rt,
    description: "特定の語句を含むメッセージがDiscordのサーバーに投稿されたとき、このメッセージを削除する。"
};
exports.default = BallonBurier;
//# sourceMappingURL=BallonBurier.js.map