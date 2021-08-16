"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FragConversion_1 = require("../Base/FragConversion");
function converseWordsFollowingRules(str, flagManger) {
    var result = str;
    for (var _i = 0, _a = flagManger.definedCmdFlags; _i < _a.length; _i++) {
        var flag = _a[_i];
        if (!flag.state)
            result = FragConversion_1.fragConverses["false" + flag.cmdForFlag](result);
    }
    return result;
}
exports.converseWordsFollowingRules = converseWordsFollowingRules;
