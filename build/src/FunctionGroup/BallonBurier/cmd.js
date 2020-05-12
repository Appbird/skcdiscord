"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("../../helper/helperAboutError"));
var TargetWordColumn_1 = require("./Base/TargetWordColumn");
var SaveDataController_1 = __importDefault(require("./SaveDataController"));
var embedMessageMaker_1 = __importDefault(require("./Base/embedMessageMaker"));
var TargetWordFragManager_1 = __importDefault(require("./Base/TargetWordFragManager"));
var FragConversion_1 = require("./Base/FragConversion");
function add(msg, tokens) {
    var _a;
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
    SaveDataController_1.default.save(savedTargetWordTable, "targetWordList.json");
    msg.channel.send(embedMessageMaker_1.default(addedColumn, (_a = msg.client.user) === null || _a === void 0 ? void 0 : _a.avatarURL()));
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
    if (lodash_1.default.findIndex(savedData, function (ele) { return ele.word !== deletedWord; }) === -1) {
        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
        return;
    }
    SaveDataController_1.default.save(savedData.filter(function (ele) { return ele.usedWordForJudging !== deletedWord; }), "targetWordList.json");
}
exports.remove = remove;
