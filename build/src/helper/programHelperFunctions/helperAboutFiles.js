"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helperAboutFiles = {
    loadJSONFromlFileInDataBase: function (fileName) {
        return JSON.parse(fs_1.readFileSync(__dirname.replace(/SkcDiscordServant\\build\\.*/, "SkcDiscordServant\\database\\" + fileName), { encoding: "utf-8" }));
    },
    saveJSONDataInDataBase: function (fileName, data) {
        fs_1.writeFileSync(__dirname.replace(/SkcDiscordServant\\build\\.*/, "SkcDiscordServant\\database\\" + fileName), JSON.stringify(data));
    }
};
exports.default = helperAboutFiles;
//# sourceMappingURL=helperAboutFiles.js.map