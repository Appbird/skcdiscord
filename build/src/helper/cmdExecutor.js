"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devideIntoTokens = void 0;
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("./programHelperFunctions/helperAboutError"));
var embedMessageMaker_1 = require("./embedMessageMaker");
var giveArgsOfHelpEmbedMsg_1 = require("./giveArgsOfHelpEmbedMsg");
function executeCmd(msg) {
    //コマンドとして成立しているか
    var tokenArray = devideIntoTokens(msg.content);
    //まずhelpコマンドの確認
    // TODO:これを一つの機能として独立させられないものか…。
    if (tokenArray[0] === "help") {
        msg.channel.send(embedMessageMaker_1.embedMessageMaker.apply(void 0, giveArgsOfHelpEmbedMsg_1.giveArgsOfHelpEmbedMsgAboutFunction()));
        if (tokenArray[1] === "-all") {
            for (var i = 0; i < functionSet_1.default.length; i++)
                msg.channel.send(embedMessageMaker_1.embedMessageMaker.apply(void 0, giveArgsOfHelpEmbedMsg_1.giveArgsOfHelpEmbedMsgAboutCmd(i)));
            msg.channel.send;
        }
        return;
    }
    if (tokenArray.length < 2) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }
    //機能が存在するか
    var usedFunctionIndex = lodash_1.default.findIndex(functionSet_1.default, function (func) { return tokenArray[0] === func.functionName; });
    if (usedFunctionIndex === -1) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "指定された機能は存在しません", "\`-h\`フラグを用いて存在する機能についてざっくり調べることが出来ます。");
        return;
    }
    //コマンドが機能内に存在するか？
    //その前に-hフラグの確認
    if (tokenArray[1] === "-h") {
        msg.channel.send(embedMessageMaker_1.embedMessageMaker.apply(void 0, giveArgsOfHelpEmbedMsg_1.giveArgsOfHelpEmbedMsgAboutCmd(usedFunctionIndex)));
        return;
    }
    var selectedCmdIndex = lodash_1.default.findIndex(functionSet_1.default[usedFunctionIndex].commands, function (cmd) { return cmd.commandTitle === tokenArray[1]; });
    if (selectedCmdIndex === -1) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "そのコマンドは、指定された機能中に存在しません。", "`-h`\u30D5\u30E9\u30B0\u3092\u7528\u3044\u3066\u3053\u306E\u30B3\u30DE\u30F3\u30C9\u306B\u3064\u3044\u3066\u8ABF\u3079\u308B\u3053\u3068\u304C\u51FA\u6765\u307E\u3059\u3002");
        return;
    }
    var requiredNumber = functionSet_1.default[usedFunctionIndex].commands[selectedCmdIndex].numberOfTokenRequired;
    if (tokenArray.length < requiredNumber) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "コマンドの引数が少なすぎます。", "\u672C\u6765" + (requiredNumber - 2) + "\u500B\u5FC5\u8981\u3067\u3042\u308B\u306E\u306B\u5BFE\u3057" + (tokenArray.length - 2) + "\u500B\u3057\u304B\u3042\u308A\u307E\u305B\u3093");
        return;
    }
    functionSet_1.default[usedFunctionIndex].commands[selectedCmdIndex].process(msg, tokenArray);
}
exports.default = executeCmd;
function devideIntoTokens(str) {
    var tokenArray = str.slice(1).split(/\s+/g);
    tokenArray[0] = tokenArray[0].toLowerCase();
    if (tokenArray.length < 2)
        return [tokenArray[0]];
    tokenArray[1] = tokenArray[1].toLowerCase();
    return tokenArray;
}
exports.devideIntoTokens = devideIntoTokens;
//# sourceMappingURL=cmdExecutor.js.map