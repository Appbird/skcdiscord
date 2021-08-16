"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commandFunctions = __importStar(require("./cmd"));
var embedMessageMaker_1 = require("../../helper/embedMessageMaker");
var standardData_1 = require("../../Data/standardData");
var cmd = [
    { commandTitle: "add",
        numberOfTokenRequired: 2,
        argsForDescription: [],
        process: function (msg) {
            msg.channel.send(embedMessageMaker_1.embedMessageMaker("\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306F\u3059\u3067\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059", CmdChannelManager.realFuncName, "\u3053\u306E\u30C1\u30E3\u30F3\u30CD\u30EB\u306B\u30B3\u30DE\u30F3\u30C9\u3092\u6253\u3061\u8FBC\u3080\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002", [], new Date(), embedMessageMaker_1.embedMsgState.Error));
            return;
        },
        description: "コマンドを受け付けるチャンネルを増やします。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。\n`>helloworld`でも反応します。",
    },
    {
        commandTitle: "remove",
        numberOfTokenRequired: 2,
        argsForDescription: [],
        process: function (msg) {
            commandFunctions.remove(msg);
        },
        description: "コマンドを受け付けるチャンネルを減らす。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。",
    },
    {
        commandTitle: "show",
        numberOfTokenRequired: 2,
        argsForDescription: [],
        process: function (msg) {
            commandFunctions.show(msg);
        },
        description: "コマンドを受け付けるチャンネルの一覧を確認します。",
    },
];
var rt_m = {
    eventType: "message",
    reactName: "add",
    process: function (msg) {
        commandFunctions.react_add(msg);
    }
};
var rt_cD = {
    eventType: "channelDelete",
    reactName: "delete",
    process: function (ch) {
        standardData_1.StandardDataManager.removeCmdChannelId(ch.id);
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
