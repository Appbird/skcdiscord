"use strict";
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
    var cmd = msg.content.toLowerCase().replace(/\s+/g, "");
    if (cmd !== ">cmdcmadd" && cmd !== ">helloworld")
        return;
    standardData_1.StandardDataManager.addCmdChannelId(msg.channel.id).then(function (result) {
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u30B3\u30DE\u30F3\u30C9\u30C1\u30E3\u30F3\u30CD\u30EB\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F\u3002", CmdChannelManager_1.default.realFuncName, "\u4ECA\u5F8C\u306F\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u3082\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3080\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Success));
    });
}
exports.react_add = react_add;
