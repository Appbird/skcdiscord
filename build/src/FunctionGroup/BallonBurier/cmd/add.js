"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutError_1 = __importDefault(require("../../../helper/programHelperFunctions/helperAboutError"));
var TargetWordColumn_1 = require("../Base/TargetWordColumn");
var SaveDataController_1 = __importDefault(require("../Base/SaveDataController"));
var embedMessageMaker_1 = require("../../../helper/embedMessageMaker");
var TargetWordFragManager_1 = __importDefault(require("../Base/TargetWordFragManager"));
var BallonBurier_1 = __importDefault(require("../BallonBurier"));
var converseWordsFollowingRules_1 = require("./converseWordsFollowingRules");
function add(msg, tokens) {
    return __awaiter(this, void 0, void 0, function () {
        var wordInformation, cmdFlagsChar, flagManager, addedColumn, savedTargetWordTable, isAlreadyAdded, listOfFlags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wordInformation = tokens.slice(2);
                    cmdFlagsChar = wordInformation.slice(1);
                    flagManager = new TargetWordFragManager_1.default();
                    addedColumn = new TargetWordColumn_1.TargetWordColumn(wordInformation[0]);
                    return [4 /*yield*/, SaveDataController_1.default.load()];
                case 1:
                    savedTargetWordTable = _a.sent();
                    addedColumn.flags = flagManager.turnOn(cmdFlagsChar, msg.channel);
                    addedColumn.usedWordForJudging = converseWordsFollowingRules_1.converseWordsFollowingRules(addedColumn.word, flagManager);
                    isAlreadyAdded = savedTargetWordTable.findIndex(function (row) { return row.usedWordForJudging === addedColumn.usedWordForJudging; }) !== -1;
                    if (isAlreadyAdded) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "既に同じ単語が登録されています。");
                        return [2 /*return*/];
                    }
                    savedTargetWordTable.push(addedColumn);
                    SaveDataController_1.default.save(savedTargetWordTable);
                    listOfFlags = flagManager.definedCmdFlags.map(function (ele) {
                        return {
                            name: (ele.state) ? "" + ele.flagTitle : "~~" + ele.flagTitle + "~~",
                            value: (ele.state) ? ele.flagOnDescription : ele.flagOffDescription,
                            inline: false
                        };
                    });
                    if (!isAlreadyAdded)
                        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u30EF\u30FC\u30C9\u300C" + addedColumn.word + "\u300D\u304C\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3055\u308C\u307E\u3057\u305F\u3002", BallonBurier_1.default.realFuncName, "以下の属性が適用されています。", listOfFlags, addedColumn.registeredTimeStamp, embedMessageMaker_1.embedMsgState.Success));
                    return [2 /*return*/];
            }
        });
    });
}
exports.add = add;
