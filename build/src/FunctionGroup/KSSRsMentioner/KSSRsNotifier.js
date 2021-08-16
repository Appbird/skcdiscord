"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cmd_1 = require("./cmd");
var cmd = [
    {
        commandTitle: "On",
        numberOfTokenRequired: 3,
        description: "役職@\`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`を与えます。この役職に対応する作品の記録が新しく登録されたとき、メンションで通知されます。\nGive you Role \`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`. If you receive that role, you can notice when the new post is appeared in \`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\` by mentioned.",
        argsForDescription: ["[GameTitle(in English): A] / [GameMode(in English): B]"],
        process: cmd_1.kssrs_rolegiver
    }, {
        commandTitle: "Off",
        numberOfTokenRequired: 3,
        description: "役職@\`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`を剥奪します。\nDeprive you of Role \`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`.",
        argsForDescription: ["[GameTitle(in English): A] / [GameMode(in English): B]"],
        process: cmd_1.kssrs_roledepriver
    }, {
        commandTitle: "GetGameTitleList",
        numberOfTokenRequired: 2,
        description: "KSSRsで扱われるゲームタイトルのリストを`[日本語] / [英語]`の形で得ることが出来ます。\nGive a List of game titles covered in KSSRs in `[Japanese] / [English]` form.",
        argsForDescription: [],
        process: cmd_1.giveKSSRsGameTitleList
    }, {
        commandTitle: "GetGameModeList",
        numberOfTokenRequired: 3,
        description: "KSSRsで扱われる`[GameTitle(in English): A]`のゲームモードのリストを`[日本語] / [英語]`の形で得ることが出来ます。\nGive a List of game modes covered in KSSRs(\`[GameTitle(in English): A]\`) in `[Japanese] / [English]` form.",
        argsForDescription: ["[GameTitle(in English): A]"],
        process: cmd_1.giveKSSRsGameModeList
    }
];
exports.KSSRsNotifer = {
    commands: cmd,
    reacts: [],
    functionName: "kssrs",
    realFuncName: "KSSRsNotifer",
    description: "KSSRsに関する機能を集めました。"
};
