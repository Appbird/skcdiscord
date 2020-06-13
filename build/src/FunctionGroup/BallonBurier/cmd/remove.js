"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
var lodash_1 = __importDefault(require("lodash"));
var helperAboutError_1 = __importDefault(require("../../../helper/programHelperFunctions/helperAboutError"));
var embedMessageMaker_1 = require("../../../helper/embedMessageMaker");
var BallonBurier_1 = __importDefault(require("../BallonBurier"));
function remove(msg, tokens) {
    var deletedWord = tokens[2];
    SaveDataController_1.default.load().then(function (savedData) {
        var indexWhereFound = lodash_1.default.findIndex(savedData, function (ele) { return ele.word === deletedWord; });
        if (indexWhereFound === -1 || deletedWord === "" || deletedWord === undefined) {
            helperAboutError_1.default.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
            return;
        }
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u30EF\u30FC\u30C9" + deletedWord + "\u3092\u30EA\u30B9\u30C8\u304B\u3089\u9664\u5916\u3057\u307E\u3057\u305F\u3002", BallonBurier_1.default.realFuncName, "", [], new Date(), embedMessageMaker_1.embedMsgState.Normal));
        SaveDataController_1.default.save(savedData.filter(function (ele, index) { return index !== indexWhereFound; }));
    });
}
exports.remove = remove;
