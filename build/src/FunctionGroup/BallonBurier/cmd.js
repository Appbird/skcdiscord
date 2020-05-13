"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.remove = exports.add = void 0;
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("../../helper/programHelperFunctions/helperAboutError"));
var TargetWordColumn_1 = require("./Base/TargetWordColumn");
var SaveDataController_1 = __importDefault(require("./SaveDataController"));
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var TargetWordFragManager_1 = __importDefault(require("./Base/TargetWordFragManager"));
var FragConversion_1 = require("./Base/FragConversion");
var BallonBurier_1 = __importDefault(require("./BallonBurier"));
function add(msg, tokens) {
    var savedTargetWordTable = SaveDataController_1.default.load();
    var wordInformation = tokens.slice(2);
    var cmdFlagsChar = wordInformation.slice(1);
    var flagManager = new TargetWordFragManager_1.default();
    var addedColumn = new TargetWordColumn_1.TargetWordColumn(wordInformation[0]);
    addedColumn.flags = flagManager.turnOn(cmdFlagsChar, msg.channel);
    addedColumn.usedWordForJudging = converseWordsFollowingRules(addedColumn.word, flagManager);
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
    msg.channel.send(embedMessageMaker_1.embedMessageMaker(":white_check_mark: \u30EF\u30FC\u30C9\u300C" + addedColumn.word + "\u300D\u304C\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F\u3002", BallonBurier_1.default.realFuncName, "以下の属性が適用されています。", listOfFlags, addedColumn.registeredTimeStamp, embedMessageMaker_1.embedMsgState.Success));
}
exports.add = add;
function converseWordsFollowingRules(str, flagManger) {
    var result = str;
    for (var _i = 0, _a = flagManger.definedCmdFlags; _i < _a.length; _i++) {
        var flag = _a[_i];
        if (!flag.state)
            result = FragConversion_1.fragConverses["false" + flag.cmdForFlag](result);
    }
    return result;
}
function remove(msg, tokens) {
    var deletedWord = tokens[2];
    var savedData = SaveDataController_1.default.load();
    if (lodash_1.default.findIndex(savedData, function (ele) { return ele.word !== deletedWord; }) === -1 || deletedWord === "" || deletedWord === undefined) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
        return;
    }
    msg.channel.send(embedMessageMaker_1.embedMessageMaker(":white_check_mark: \u30EF\u30FC\u30C9" + deletedWord + "\u3092\u30EA\u30B9\u30C8\u304B\u3089\u9664\u5916\u3057\u307E\u3057\u305F\u3002", BallonBurier_1.default.realFuncName, "", [], new Date(), embedMessageMaker_1.embedMsgState.Normal));
    SaveDataController_1.default.save(savedData.filter(function (ele) { return ele.usedWordForJudging !== deletedWord; }));
}
exports.remove = remove;
function show(msg) {
    var listOfFlags = SaveDataController_1.default.load().map(function (column) {
        var flagEnumerated = column.flags.join(" , ");
        return {
            name: "__**" + column.word + "**__",
            value: (flagEnumerated === "") ? "no flag" : flagEnumerated,
            inline: false
        };
    });
    msg.channel.send(embedMessageMaker_1.embedMessageMaker(":information_source: 対象リストとそのワードに関するフラグ一覧", BallonBurier_1.default.realFuncName, "", listOfFlags, new Date(), embedMessageMaker_1.embedMsgState.Normal));
}
exports.show = show;
//# sourceMappingURL=cmd.js.map