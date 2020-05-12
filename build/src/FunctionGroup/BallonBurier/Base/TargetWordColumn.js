"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetWordColumn = void 0;
var TargetWordColumn = /** @class */ (function () {
    function TargetWordColumn(registeredWord) {
        this.usedWordForJudging = "";
        this.timeOfBuried = 0;
        this.flags = [];
        this.word = registeredWord;
        this.usedWordForJudging = registeredWord;
        this.registeredTimeStamp = new Date();
    }
    return TargetWordColumn;
}());
exports.TargetWordColumn = TargetWordColumn;
