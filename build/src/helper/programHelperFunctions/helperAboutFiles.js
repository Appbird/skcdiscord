"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var logger_1 = __importDefault(require("../../test/logger"));
var helperAboutFiles = {
    loadJSONFromlFileInDataBase: function (fileName) {
        var file = "";
        try {
            file = fs_1.readFileSync(__dirname + "\\..\\..\\..\\..\\database\\" + fileName, { encoding: "utf-8" });
        }
        catch (e) {
            return undefined;
        }
        return JSON.parse(file);
    },
    saveJSONDataInDataBase: function (fileName, data) {
        var folders = fileName.split(/[\\|/]/).slice(undefined, -1);
        folders.unshift("database");
        logger_1.default.debug(folders);
        var depth = 1;
        for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
            var folderName = folders_1[_i];
            if (!fs_1.existsSync(__dirname + "\\..\\..\\..\\..\\" + folders.slice(undefined, depth).join("\\")))
                fs_1.mkdirSync(__dirname + "\\..\\..\\..\\..\\" + folders.slice(undefined, depth).join("\\"));
            depth++;
        }
        fs_1.writeFileSync(__dirname + "\\..\\..\\..\\..\\database\\" + fileName, JSON.stringify(data), { flag: "w" });
    }
};
exports.default = helperAboutFiles;
