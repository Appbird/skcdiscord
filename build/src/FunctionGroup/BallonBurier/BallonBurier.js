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
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u306B`[\u6587\u5B57\u5217A]`\u3092\u767B\u9332\u3059\u308B\u3002\u3053\u306E\u6587\u5B57\u5217\u306B\u534A\u89D2\u7A7A\u6B04\u3092\u542B\u3081\u308B\u3053\u3068\u306F\u3067\u304D\u306A\u3044\u3002\n                    \u307E\u305F\u3001\u30D5\u30E9\u30B0(`-eS`\u306A\u3069)\u3092\u660E\u8A18\u3059\u308B\u3053\u3068\u3067\u3001\n                    \u30E1\u30C3\u30BB\u30FC\u30B8\u306B\u5BFE\u8C61\u304C\u542B\u307E\u308C\u3066\u3044\u308B\u304B\u8ABF\u3079\u308B\u8D70\u67FB\u306B\u3064\u3044\u3066\u8FFD\u52A0\u8A2D\u5B9A\u3092\u884C\u3046\u3053\u3068\u304C\u51FA\u6765\u308B\u3002\n                    \u3061\u306A\u307F\u306B\u5076\u6570\u56DE\u540C\u3058\u30D5\u30E9\u30B0\u3092\u660E\u8A18\u3059\u308B\u3068\u7121\u52B9\u306B\u306A\u308B\u3002",
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
