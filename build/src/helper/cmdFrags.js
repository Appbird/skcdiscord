"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutError_1 = __importDefault(require("./programHelperFunctions/helperAboutError"));
var cmdFlagManager = /** @class */ (function () {
    function cmdFlagManager() {
        /** @property コマンドに用意された存在するフラグの一覧。*/
        this.definedCmdFlags = [];
    }
    /**
     * 大文字小文字関係なくフラグは反応します。
     * @param cmdFlags コマンドとして入力された、フラグを表す文字列配列
     * @param channel エラーが起こった際にメッセージを送るチャンネル
     * @return 反応した全てのフラグ
     */
    cmdFlagManager.prototype.turnOn = function (cmdFlagsChar, channel) {
        var result = [];
        var _loop_1 = function (cmdFlag) {
            var judgedCmdFlag = cmdFlag.toLowerCase();
            if (judgedCmdFlag[0] !== "-") {
                helperAboutError_1.default.throwErrorToDiscord(channel, "\u3053\u306E\u30B3\u30DE\u30F3\u30C9\u306F\u3053\u308C\u307B\u3069\u591A\u304F\u306E\u5F15\u6570\u306F\u53D6\u308A\u307E\u305B\u3093\u3002");
                return "continue";
            }
            var definedCmdFlagIndex = this_1.definedCmdFlags.findIndex(function (element) { return element.cmdForFlag === judgedCmdFlag; });
            if (definedCmdFlagIndex === -1) {
                helperAboutError_1.default.throwErrorToDiscord(channel, "\u30D5\u30E9\u30B0\"" + cmdFlag + "\"\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u3053\u306E\u30D5\u30E9\u30B0\u3092\u7121\u8996\u3057\u3066\u51E6\u7406\u3092\u7D9A\u884C\u3057\u307E\u3059\u3002");
                return "continue";
            }
            this_1.definedCmdFlags[definedCmdFlagIndex].state = !this_1.definedCmdFlags[definedCmdFlagIndex].state;
            result.push(cmdFlag);
        };
        var this_1 = this;
        for (var _i = 0, cmdFlagsChar_1 = cmdFlagsChar; _i < cmdFlagsChar_1.length; _i++) {
            var cmdFlag = cmdFlagsChar_1[_i];
            _loop_1(cmdFlag);
        }
        return result;
    };
    return cmdFlagManager;
}());
exports.cmdFlagManager = cmdFlagManager;
