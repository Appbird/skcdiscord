"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var releaseConfig_1 = __importDefault(require("../releaseConfig"));
var helperAboutFiles = {
    loadJSONFromlFileInDataBase: function (fileName) {
        if (releaseConfig_1.default) {
            fileName = fileName.replace(/[\\|/]/g, "_");
            return process.env[fileName];
        }
        else {
            return this._loadJSONFromlFileInDataBase(fileName);
        }
    },
    saveJSONDataInDataBase: function (fileName, data) {
        if (releaseConfig_1.default) {
            fileName = fileName.replace(/[\\|/]/g, "_");
            process.env[fileName] = JSON.stringify(data);
        }
        else {
            this._saveJSONDataInDataBase(fileName, data);
        }
    },
    _loadJSONFromlFileInDataBase: function (fileName) {
        var file = "";
        try {
            file = fs_1.readFileSync(__dirname + "\\..\\..\\..\\..\\database\\" + fileName, { encoding: "utf-8" });
        }
        catch (e) {
            return undefined;
        }
        return JSON.parse(file);
    },
    _saveJSONDataInDataBase: function (fileName, data) {
        var folders = fileName.split(/[\\|/]/).slice(undefined, -1);
        folders.unshift("database");
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
