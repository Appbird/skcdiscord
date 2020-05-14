"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
var embedMessageMaker_1 = require("../../../helper/embedMessageMaker");
var BallonBurier_1 = __importDefault(require("../BallonBurier"));
function reactLog(msg, tokens) {
    var saved = SaveDataController_1.default.configLoad();
    saved.idOfChannelWhichItOutputReactLogTo = msg.channel.id;
    if (tokens[2] !== undefined) {
        if (tokens[2].toLowerCase() === "-delete") {
            saved.idOfChannelWhichItOutputReactLogTo = "";
        }
    }
    SaveDataController_1.default.configSave(saved);
    msg.channel.send(embedMessageMaker_1.embedMessageMaker((saved.idOfChannelWhichItOutputReactLogTo !== "") ?
        "このチャンネルをログ出力先チャンネルとして設定しました！" :
        "ログを出力しないように設定しました！", BallonBurier_1.default.realFuncName, (saved.idOfChannelWhichItOutputReactLogTo !== "") ?
        "今後このチャンネルにログが出力されます。" :
        "どこかのチャンネルでもう一度このコマンドを入力するとログが出力されるようになります。", [], new Date(), embedMessageMaker_1.embedMsgState.Normal));
}
exports.default = reactLog;
