"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cmdFrags_1 = require("../../../helper/cmdFrags");
var TargetWordFragManager = /** @class */ (function (_super) {
    __extends(TargetWordFragManager, _super);
    function TargetWordFragManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.definedCmdFlags = [
            {
                flagTitle: "emphasizeSpace",
                cmdForFlag: "-es", state: false
            },
            {
                flagTitle: "emphasizeUnrelatedInscription",
                cmdForFlag: "-eui", state: false
            },
            {
                flagTitle: "emphasizeProlongedSoundMark",
                cmdForFlag: "-epsm", state: false
            },
            {
                flagTitle: "emphasizeDistinctionBetweenHiraKata",
                cmdForFlag: "-edbhk", state: false
            },
            {
                flagTitle: "emphasizeDistinctionAlpBetweenLargeSmall",
                cmdForFlag: "-edabls", state: false
            }
        ];
        return _this;
    }
    return TargetWordFragManager;
}(cmdFrags_1.cmdFlagManager));
exports.default = TargetWordFragManager;
