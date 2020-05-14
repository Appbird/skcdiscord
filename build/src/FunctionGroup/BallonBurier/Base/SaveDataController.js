"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutFiles_1 = __importDefault(require("../../../helper/programHelperFunctions/helperAboutFiles"));
var SaveDataController = {
    load: function () {
        var data = helperAboutFiles_1.default.loadJSONFromlFileInDataBase("BallonBurier/targetWordList.json").saved;
        if (data == undefined)
            data.saved = [];
        return data;
    },
    save: function (data) {
        return helperAboutFiles_1.default.saveJSONDataInDataBase("BallonBurier/targetWordList.json", { saved: data });
    },
    configLoad: function () {
        var data = helperAboutFiles_1.default.loadJSONFromlFileInDataBase("BallonBurier/config.json");
        if (data == undefined)
            data = {
                idOfChannelWhichItOutputReactLogTo: ""
            };
        return data;
    },
    configSave: function (data) {
        return helperAboutFiles_1.default.saveJSONDataInDataBase("BallonBurier/config.json", data);
    }
};
exports.default = SaveDataController;
