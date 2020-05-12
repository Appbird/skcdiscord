"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveDataController_1 = __importDefault(require("./SaveDataController"));
var FragConversion_1 = require("./Base/FragConversion");
var lodash_1 = __importDefault(require("lodash"));
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var standardData_1 = __importDefault(require("../../Data/standardData"));
var BallonBurier_1 = __importDefault(require("./BallonBurier"));
function buryWord(msg) {
    var _a;
    var targetWordList = SaveDataController_1.default.load();
    var foundWord = _detectWordInMsg(msg.content, targetWordList);
    if (foundWord === "")
        return;
    msg.delete();
    var deleteCountIndex = lodash_1.default.findIndex(targetWordList, { word: foundWord });
    targetWordList[deleteCountIndex].timeOfBuried++;
    (_a = msg.client.channels.cache.get(standardData_1.default.cmdChannnelId[0])) === null || _a === void 0 ? void 0 : _a.send(embedMessageMaker_1.embedMessageMaker("メッセージが埋め立てられてしまいました…。", BallonBurier_1.default.realFuncName, "__**" + msg.author.username + "**__ > " + msg.content, [{ name: "原因", value: foundWord, inline: true },
        { name: "今まで埋め立てられた回数", value: targetWordList[deleteCountIndex].timeOfBuried.toString(), inline: true }], new Date(), embedMessageMaker_1.embedMsgState.Success));
}
exports.default = buryWord;
/**
 * @param msg 受け取ったメッセージの内容
 * @param targetWordList 対象リスト
 * @return 対象を発見したときにはその対象を返し、何も発見できなかった時はWordを投げる。
 */
function _detectWordInMsg(detectedStr, targetWordList) {
    var converseList = lodash_1.default.entries(FragConversion_1.fragConverses);
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
