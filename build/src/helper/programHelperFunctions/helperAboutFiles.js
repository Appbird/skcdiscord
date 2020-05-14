"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helperAboutFiles = {
    loadJSONFromlFileInDataBase: function (fileName) {
        var file = "";
        try {
            file = fs_1.readFileSync(__dirname + "/.../database/" + fileName, { encoding: "utf-8" });
        }
        catch (e) {
            return undefined;
        }
        return JSON.parse(file);
    },
    saveJSONDataInDataBase: function (fileName, data) {
        fs_1.writeFileSync(__dirname + "/.../database/" + fileName, JSON.stringify(data));
    }
};
exports.default = helperAboutFiles;
