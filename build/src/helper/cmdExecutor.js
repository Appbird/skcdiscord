"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("./helperAboutError"));
function executeCmd(msg) {
    var tokenArray = devideIntoTokens(msg.content);
    if (tokenArray.length < 2) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }
    var usedFunctionIndex = lodash_1.default.findIndex(functionSet_1.default, function (func) { return tokenArray[0] === func.functionName; });
    //CTODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    //lodashパッケージを使うことで解決。とても便利。
    if (usedFunctionIndex === -1) {
        var functionNameList = "";
        for (var _i = 0, functionSet_2 = functionSet_1.default; _i < functionSet_2.length; _i++) {
            var ele = functionSet_2[_i];
            functionNameList += "- " + ele.functionName + "\n";
        }
        var sent = "\u6307\u5B9A\u3055\u308C\u305F\u6A5F\u80FD\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\n                    \u5B58\u5728\u3059\u308B\u306E\u306F\u4EE5\u4E0B\u306E\u6A5F\u80FD\u3067\u3059\u3002\n                    " + functionNameList;
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, sent);
        return;
    }
    var selectedCmdIndex = lodash_1.default.findIndex(functionSet_1.default[usedFunctionIndex].commands, function (cmd) { return cmd.commandTitle === tokenArray[1]; });
    if (selectedCmdIndex === -1) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    functionSet_1.default[usedFunctionIndex].commands[selectedCmdIndex].process(msg, tokenArray);
}
exports.default = executeCmd;
function devideIntoTokens(str) {
    var tokenArray = str.slice(1).split(/\s+/g);
    if (tokenArray.length < 2)
        return [];
    tokenArray[0] = tokenArray[0].toLowerCase();
    tokenArray[1] = tokenArray[1].toLowerCase();
    return tokenArray;
}
exports.devideIntoTokens = devideIntoTokens;
