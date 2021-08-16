"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var remove_1 = require("./cmd/remove");
var show_1 = __importDefault(require("./cmd/show"));
var add_1 = require("./cmd/add");
var react_1 = __importDefault(require("./react"));
var reactLog_1 = __importDefault(require("./cmd/reactLog"));
var TargetWordFragManager_1 = __importDefault(require("./Base/TargetWordFragManager"));
var cmd = [
    {
        commandTitle: "add",
        allowedFlags: (new TargetWordFragManager_1.default()).definedCmdFlags,
        numberOfTokenRequired: 3,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u306B`[\u6587\u5B57\u5217A]`\u3092\u767B\u9332\u3059\u308B\u3002",
        argsForDescription: ["[文字列A]", "[フラグ]"],
        process: add_1.add
    },
    {
        commandTitle: "remove",
        numberOfTokenRequired: 3,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u306B\u3042\u308B`[\u6587\u5B57\u5217A]`\u3092\u524A\u9664\u3059\u308B\u3002",
        argsForDescription: ["[文字列A]"],
        process: remove_1.remove
    },
    {
        commandTitle: "show",
        numberOfTokenRequired: 2,
        description: "\u5BFE\u8C61\u30EA\u30B9\u30C8\u3092bot\u306B\u30E1\u30C3\u30BB\u30FC\u30B8\u3068\u3057\u3066\u51FA\u529B\u3055\u305B\u308B\u3002",
        argsForDescription: [],
        process: show_1.default
    },
    {
        commandTitle: "reactlog",
        numberOfTokenRequired: 2,
        description: "\u30B3\u30E1\u30F3\u30C8\u304C\u57CB\u3081\u7ACB\u3066\u3089\u308C\u305F\u6642\u306B\u30ED\u30B0\u3092\u51FA\u529B\u3059\u308B\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u8A2D\u5B9A\u3059\u308B\u3002`-delete`\u30D5\u30E9\u30B0\u3092\u7528\u3044\u3066\u30ED\u30B0\u3092\u51FA\u529B\u3057\u306A\u3044\u3088\u3046\u306B\u8A2D\u5B9A\u3059\u308B\u3053\u3068\u3082\u3067\u304D\u308B\u3002",
        argsForDescription: [],
        process: reactLog_1.default
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
