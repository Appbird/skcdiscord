"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helperAboutFiles = {
    loadJSONFromlFileInDataBase: function (fileName) {
        return JSON.parse(fs_1.readFileSync("./database/" + fileName, { encoding: "utf-8" }));
    },
    saveJSONDataInDataBase: function (fileName, data) {
        fs_1.writeFileSync("./database/" + fileName, JSON.stringify(data));
    }
};
exports.default = helperAboutFiles;
