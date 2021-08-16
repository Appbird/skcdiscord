"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveDataController_1 = __importDefault(require("./Base/SaveDataController"));
var FragConversion_1 = require("./Base/FragConversion");
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var BallonBurier_1 = __importDefault(require("./BallonBurier"));
var standardData_1 = require("../../Data/standardData");
function buryWord(msg) {
    Promise.all([SaveDataController_1.default.load(), SaveDataController_1.default.configLoad(), standardData_1.StandardDataManager.getCmdChannelId()]).then(function (_a) {
        var targetWordList = _a[0], idOfChannelWhichItOutputReactLogTo = _a[1].idOfChannelWhichItOutputReactLogTo, cmdChannelId = _a[2];
        var _b;
        var idOfChannelSentLog = idOfChannelWhichItOutputReactLogTo;
        var foundWord = _detectWordInMsg(msg.content, targetWordList);
        if ((msg.content.toLowerCase().indexOf(">babu") === 0 && cmdChannelId.findIndex(function (ele) { return ele === msg.channel.id; }) === -1) || foundWord === "")
            return;
        msg.delete({ reason: BallonBurier_1.default.realFuncName + " > \u5BFE\u8C61\u3068\u306A\u308B\u30EF\u30FC\u30C9\u304C\u542B\u307E\u308C\u3066\u3044\u305F\u305F\u3081\u3002" });
        var deleteCountIndex = targetWordList.findIndex(function (ele) { return ele.word === foundWord; });
        targetWordList[deleteCountIndex].timeOfBuried++;
        SaveDataController_1.default.save(targetWordList);
        if (idOfChannelSentLog === "")
            return;
        (_b = msg.client.channels.cache.get(idOfChannelSentLog)) === null || _b === void 0 ? void 0 : _b.send(embedMessageMaker_1.embedMessageMaker("メッセージが埋め立てられてしまいました…。", BallonBurier_1.default.realFuncName, "__**" + msg.author.username + "**__ > " + msg.content, [{ name: "原因", value: foundWord, inline: true },
            { name: "今まで埋め立てられた回数", value: targetWordList[deleteCountIndex].timeOfBuried.toString(), inline: true }], new Date(), embedMessageMaker_1.embedMsgState.Normal));
    });
}
exports.default = buryWord;
/**
 * @param msg 受け取ったメッセージの内容
 * @param targetWordList 対象リスト
 * @return 対象を発見したときにはその対象を返し、何も発見できなかった時はWordを投げる。
 */
function _detectWordInMsg(detectedStr, targetWordList) {
    var converseList = Object.entries(FragConversion_1.fragConverses);
    if (targetWordList === undefined)
        return "";
    for (var _i = 0, targetWordList_1 = targetWordList; _i < targetWordList_1.length; _i++) {
        var aListedWord = targetWordList_1[_i];
        if (detectedStr.indexOf(aListedWord.usedWordForJudging) !== -1)
            return aListedWord.word;
    }
    for (var _a = 0, converseList_1 = converseList; _a < converseList_1.length; _a++) {
        var aConverse = converseList_1[_a];
        detectedStr = aConverse[1](detectedStr);
        for (var _b = 0, targetWordList_2 = targetWordList; _b < targetWordList_2.length; _b++) {
            var aListedWord = targetWordList_2[_b];
            if (detectedStr.indexOf(aListedWord.usedWordForJudging) !== -1)
                return aListedWord.word;
        }
    }
    return "";
}
