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
exports.react_add = exports.show = exports.remove = void 0;
var standardData_1 = require("../../Data/standardData");
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var CmdChannelManager_1 = __importDefault(require("./CmdChannelManager"));
var client_1 = __importDefault(require("../../client"));
function remove(msg) {
    standardData_1.StandardDataManager.removeCmdChannelId(msg.channel.id).then(function () {
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u30B3\u30DE\u30F3\u30C9\u30C1\u30E3\u30F3\u30CD\u30EB\u304B\u3089\u5916\u3057\u307E\u3057\u305F\u3002", CmdChannelManager_1.default.realFuncName, "\u4ECA\u5F8C\u306F\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306F\u30B3\u30DE\u30F3\u30C9\u3092\u53D7\u3051\u4ED8\u3051\u307E\u305B\u3093\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Success));
    });
}
exports.remove = remove;
function show(msg) {
    standardData_1.StandardDataManager.getCmdChannelId().then(function (cmdChannelId) {
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3093\u3067\u53CD\u5FDC\u3067\u304D\u308B\u30C1\u30E3\u30F3\u30CD\u30EB\u306E\u4E00\u89A7\u3067\u3059\u3002", CmdChannelManager_1.default.realFuncName, "\u30EA\u30A2\u30AF\u30C8\u306E\u7D50\u679C\u306F\u4E3B\u8981\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u767A\u4FE1\u3055\u308C\u307E\u3059\u3002", cmdChannelId.map(function (id, index) {
            var _a;
            var channelName = (_a = client_1.default.channels.cache.get(id)) === null || _a === void 0 ? void 0 : _a.toString();
            if (channelName === undefined)
                return { name: "取得できませんでした", value: "-", inline: false };
            return {
                name: (index === 0) ? "主要チャンネル" : "サブチャンネル",
                value: channelName,
                inline: false
            };
        }), new Date(), embedMessageMaker_1.embedMsgState.Normal));
    });
}
exports.show = show;
function react_add(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var cmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cmd = msg.content.toLowerCase().replace(/\s+/g, "");
                    if (cmd !== ">cmdcmadd" && cmd !== ">helloworld")
                        return [2 /*return*/];
                    return [4 /*yield*/, standardData_1.StandardDataManager.addCmdChannelId(msg.channel.id)];
                case 1:
                    if ((_a.sent()) === standardData_1.addCmdChannelIdState.alreadyadded)
                        return [2 /*return*/];
                    msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u30B3\u30DE\u30F3\u30C9\u30C1\u30E3\u30F3\u30CD\u30EB\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F\u3002", CmdChannelManager_1.default.realFuncName, "\u4ECA\u5F8C\u306F\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u3082\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3080\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Success));
                    return [2 /*return*/];
            }
        });
    });
}
exports.react_add = react_add;
