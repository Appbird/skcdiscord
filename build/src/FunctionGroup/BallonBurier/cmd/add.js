"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("../../../helper/programHelperFunctions/helperAboutError"));
var TargetWordColumn_1 = require("../Base/TargetWordColumn");
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
var embedMessageMaker_1 = require("../../../helper/embedMessageMaker");
var TargetWordFragManager_1 = __importDefault(require("../Base/TargetWordFragManager"));
var BallonBurier_1 = __importDefault(require("../BallonBurier"));
var converseWordsFollowingRules_1 = require("./converseWordsFollowingRules");
function add(msg, tokens) {
    var wordInformation = tokens.slice(2);
    var cmdFlagsChar = wordInformation.slice(1);
    var flagManager = new TargetWordFragManager_1.default();
    var addedColumn = new TargetWordColumn_1.TargetWordColumn(wordInformation[0]);
    var savedTargetWordTable = SaveDataController_1.default.load().then(function (savedTargetWordTable) {
        addedColumn.flags = flagManager.turnOn(cmdFlagsChar, msg.channel);
        addedColumn.usedWordForJudging = converseWordsFollowingRules_1.converseWordsFollowingRules(addedColumn.word, flagManager);
        if (lodash_1.default.findIndex(savedTargetWordTable, function (row) { return row.usedWordForJudging === addedColumn.usedWordForJudging; }) !== -1) {
            helperAboutError_1.default.throwErrorToDiscord(msg.channel, "既に同じ単語が登録されています。");
            return;
        }
        savedTargetWordTable.push(addedColumn);
        SaveDataController_1.default.save(savedTargetWordTable);
        var listOfFlags = flagManager.definedCmdFlags.map(function (ele) {
            return {
                name: (ele.state) ? "" + ele.flagTitle : "~~" + ele.flagTitle + "~~",
                value: (ele.state) ? ele.flagOnDescription : ele.flagOffDescription,
                inline: false
            };
        });
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u30EF\u30FC\u30C9\u300C" + addedColumn.word + "\u300D\u304C\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F\u3002", BallonBurier_1.default.realFuncName, "以下の属性が適用されています。", listOfFlags, addedColumn.registeredTimeStamp, embedMessageMaker_1.embedMsgState.Success));
    });
}
exports.add = add;
