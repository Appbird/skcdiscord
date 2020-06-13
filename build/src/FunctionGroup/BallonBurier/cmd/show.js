"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
var embedMessageMaker_1 = require("../../../helper/embedMessageMaker");
var BallonBurier_1 = __importDefault(require("../BallonBurier"));
function show(msg) {
    SaveDataController_1.default.load().then(function (data) {
        var listOfFlags = data.map(function (column) {
            var flagEnumerated = column.flags.join(" , ");
            return {
                name: "__**" + column.word + "**__",
                value: (flagEnumerated === "") ? "no flag" : flagEnumerated,
                inline: false
            };
        });
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("対象リストとそのワードに関するフラグ一覧", BallonBurier_1.default.realFuncName, "", listOfFlags, new Date(), embedMessageMaker_1.embedMsgState.Normal));
    });
}
exports.default = show;
