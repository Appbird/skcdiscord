"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var standardData_1 = __importDefault(require("../../Data/standardData"));
var client_1 = __importDefault(require("../../client"));
var cmd = [
    { commandTitle: "add",
        numberOfTokenRequired: 2,
        argsForDescription: [], process: function (msg) {
            msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059", CmdChannelManager.realFuncName, "\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3080\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Error));
            return;
        }, description: "コマンドを受け付けるチャンネルを増やします。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。\n`>helloworld`でも反応します。", },
    {
        commandTitle: "remove",
        numberOfTokenRequired: 2,
        argsForDescription: [],
        process: function (msg) {
            standardData_1.default.removeCmdChannelId(msg.channel.id);
            msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u30B3\u30DE\u30F3\u30C9\u30C1\u30E3\u30F3\u30CD\u30EB\u304B\u3089\u5916\u3057\u307E\u3057\u305F\u3002", CmdChannelManager.realFuncName, "\u4ECA\u5F8C\u306F\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306F\u30B3\u30DE\u30F3\u30C9\u3092\u53D7\u3051\u4ED8\u3051\u307E\u305B\u3093\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Success));
        },
        description: "コマンドを受け付けるチャンネルを減らす。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。",
    },
    {
        commandTitle: "show",
        numberOfTokenRequired: 2,
        argsForDescription: [],
        process: function (msg) {
            msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3093\u3067\u53CD\u5FDC\u3067\u304D\u308B\u30C1\u30E3\u30F3\u30CD\u30EB\u306E\u4E00\u89A7\u3067\u3059\u3002", CmdChannelManager.realFuncName, "\u30EA\u30A2\u30AF\u30C8\u306E\u7D50\u679C\u306F\u4E3B\u8981\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u767A\u4FE1\u3055\u308C\u307E\u3059\u3002", standardData_1.default.cmdChannelId.map(function (id, index) {
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
        },
        description: "コマンドを受け付けるチャンネルの一覧を確認します。",
    },
];
var rt_m = {
    eventType: "message",
    reactName: "add",
    process: function (msg) {
        if (standardData_1.default.findCmdChannelId(msg.channel.id))
            return;
        var cmd = msg.content.toLowerCase().replace(/\s+/g, "");
        if (cmd !== ">cmdcmadd" && cmd !== ">helloworld")
            return;
        standardData_1.default.addCmdChannelId(msg.channel.id);
        msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u3092\u30B3\u30DE\u30F3\u30C9\u30C1\u30E3\u30F3\u30CD\u30EB\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3057\u305F\u3002", CmdChannelManager.realFuncName, "\u4ECA\u5F8C\u306F\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u3082\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3080\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Success));
    }
};
var rt_cD = {
    eventType: "channelDelete",
    reactName: "add",
    process: function (ch) {
        standardData_1.default.removeCmdChannelId(ch.id);
    }
};
var CmdChannelManager = {
    functionName: "cmdcm",
    realFuncName: "CmdChannelManager",
    reacts: [rt_m, rt_cD],
    commands: cmd,
    description: "コマンドを受け付けるチャンネルを管理します。"
};
exports.default = CmdChannelManager;
