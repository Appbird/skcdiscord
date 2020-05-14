"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutFiles_1 = __importDefault(require("../../../helper/programHelperFunctions/helperAboutFiles"));
var SaveDataController = {
    load: function () {
        return helperAboutFiles_1.default.loadJSONFromlFileInDataBase("BallonBurier/targetWordList.json").saved;
    },
    save: function (data) {
        return helperAboutFiles_1.default.saveJSONDataInDataBase("BallonBurier/targetWordList.json", { saved: data });
    },
    configLoad: function () {
        return helperAboutFiles_1.default.loadJSONFromlFileInDataBase("BallonBurier/config.json");
    },
    configSave: function (data) {
        return helperAboutFiles_1.default.saveJSONDataInDataBase("BallonBurier/config.json", data);
    }
};
exports.default = SaveDataController;
