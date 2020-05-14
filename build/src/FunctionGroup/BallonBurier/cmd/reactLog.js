"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
function reactLog(msg, tokens) {
    var saved = SaveDataController_1.default.configLoad();
    saved.idOfChannelWhichItOutputReactLogTo = msg.channel.id;
    if (tokens[2].toLowerCase() === "-delete") {
        saved.idOfChannelWhichItOutputReactLogTo = "";
    }
    SaveDataController_1.default.configSave(saved);
}
exports.default = reactLog;
