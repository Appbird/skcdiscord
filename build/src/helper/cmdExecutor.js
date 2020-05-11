"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var lodash_1 = __importDefault(require("lodash"));
function executeCmd(msg) {
    var msgLow = msg.content.toLowerCase();
    var TokenArray = msgLow.slice(1).split(/\s+/g);
    if (TokenArray.length < 2) {
        msg.channel.send("error > メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }
    var usedFunctionIndex = lodash_1.default.findIndex(functionSet_1.default, function (func) { return TokenArray[0] === func.functionName; });
    //CTODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    //lodashパッケージを使うことで解決。とても便利。
    if (usedFunctionIndex === -1) {
        var functionNameList = "";
        for (var _i = 0, functionSet_2 = functionSet_1.default; _i < functionSet_2.length; _i++) {
            var ele = functionSet_2[_i];
            functionNameList += "- " + ele.functionName + "\n";
        }
        var sent = "error > 指定された機能は存在しません。\n存在するのは以下の機能です。\n" + functionNameList;
        msg.channel.send(sent);
        return;
    }
    var selectedCmdIndex = lodash_1.default.findIndex(functionSet_1.default[usedFunctionIndex].commands, function (cmd) { return cmd.commandTitle === TokenArray[1]; });
    if (selectedCmdIndex === -1) {
        msg.channel.send("error > そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    functionSet_1.default[usedFunctionIndex].commands[selectedCmdIndex].process(msg, TokenArray);
}
exports.default = executeCmd;
