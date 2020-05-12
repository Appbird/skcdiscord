"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TargetWordColumn_1 = require("./Base/TargetWordColumn");
var SaveDataController = {
    load: function () {
        return [new TargetWordColumn_1.TargetWordColumn("あ")];
    },
    save: function (data, title) {
        JSON.stringify(data);
        return;
    }
};
exports.default = SaveDataController;
