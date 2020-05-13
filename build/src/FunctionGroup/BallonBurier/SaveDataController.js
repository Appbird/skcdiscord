"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutFiles_1 = __importDefault(require("../../helper/programHelperFunctions/helperAboutFiles"));
var SaveDataController = {
    load: function () {
        return helperAboutFiles_1.default.loadJSONFromlFileInDataBase("targetWordList.json").saved;
    },
    save: function (data) {
        return helperAboutFiles_1.default.saveJSONDataInDataBase("targetWordList.json", { saved: data });
    }
};
exports.default = SaveDataController;
//# sourceMappingURL=SaveDataController.js.map