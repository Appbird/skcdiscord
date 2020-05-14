"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveArgsOfHelpEmbedMsgAboutCmd = exports.giveArgsOfHelpEmbedMsgAboutFunction = void 0;
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var embedMessageMaker_1 = require("./embedMessageMaker");
function giveArgsOfHelpEmbedMsgAboutFunction() {
    return ["\u6A5F\u80FD\u7FA4", "Helper", "", functionSet_1.default.map(function (ele) {
            return {
                name: ele.functionName + "(" + ele.realFuncName + ")",
                value: ele.description,
                inline: false
            };
        }), new Date(), embedMessageMaker_1.embedMsgState.Normal];
}
exports.giveArgsOfHelpEmbedMsgAboutFunction = giveArgsOfHelpEmbedMsgAboutFunction;
function giveArgsOfHelpEmbedMsgAboutCmd(functionIndex) {
    var givenField = functionSet_1.default[functionIndex].
        commands.map(function (ele) {
        return {
            name: "" + ele.commandTitle,
            value: "```>" + functionSet_1.default[functionIndex].functionName + " " + ele.commandTitle + " " + ele.argsForDescription.join(" ") + "```\n                " + ((ele.allowedFlags !== undefined) ?
                "**[フラグ]**\n" + ele.allowedFlags.map(function (flag) { return "__" + flag.cmdForFlag + "(" + flag.flagTitle + ")" + "__\nOnのとき、" + flag.flagOnDescription; }).join("\n") + "\n" : "") + "**[\u8AAC\u660E]**\n" + ele.description,
            inline: false
        };
    });
    return [(functionSet_1.default[functionIndex].realFuncName) + "\u306E\u30B3\u30DE\u30F3\u30C9", "Helper", "", givenField, new Date(), embedMessageMaker_1.embedMsgState.Normal];
}
exports.giveArgsOfHelpEmbedMsgAboutCmd = giveArgsOfHelpEmbedMsgAboutCmd;
