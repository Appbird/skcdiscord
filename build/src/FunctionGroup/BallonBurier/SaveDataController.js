"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var SaveDataController = {
    load: function () {
        return JSON.parse(fs_1.default.readFileSync("./targetWordList.json", { encoding: "utf-8", flag: "a" }));
    },
    save: function (data) {
        fs_1.default.writeFileSync("./targetWordList.json", JSON.stringify(data));
    }
};
exports.default = SaveDataController;
