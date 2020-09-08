import IFunctionBase from "../../Base/IFunctionBase";
import ICommandBase from "../../Base/ICommandBase";
import IReactBase from "../../Base/IReactBase";

import { remove } from "./cmd/remove";
import show from "./cmd/show";
import { add } from "./cmd/add";
import buryWord from "./react";
import reactLog from "./cmd/reactLog";

import TargetWordFragManager from "./Base/TargetWordFragManager";


let cmd:ICommandBase[] = [
    {
        commandTitle :"add",
        allowedFlags:(new TargetWordFragManager()).definedCmdFlags,
        numberOfTokenRequired:3,
        description:`対象リストに\`[文字列A]\`を登録する。`,
        argsForDescription: ["[文字列A]","[フラグ]"],
        process : add
    },
    {
        commandTitle : "remove",
        numberOfTokenRequired:3,
        description:`対象リストにある\`[文字列A]\`を削除する。`,
        argsForDescription: ["[文字列A]"],
        process : remove
    },
    {
        commandTitle : "show",
        numberOfTokenRequired:2,
        description:`対象リストをbotにメッセージとして出力させる。`,
        argsForDescription: [],
        process : show
    },
    {
        commandTitle : "reactlog",
        numberOfTokenRequired:2,
        description:`コメントが埋め立てられた時にログを出力するチャンネルを設定する。\`-delete\`フラグを用いてログを出力しないように設定することもできる。`,
        argsForDescription: [],
        process : reactLog
    }
];

let rt:IReactBase<"message">[] = [
    {
        eventType:"message",
        reactName:"buryWord",
        process : buryWord
    }
];


let BallonBurier:IFunctionBase = {
    functionName:"babu",
    realFuncName:"BalloonBurier",
    commands:cmd,
    reacts:rt,
    description:"特定の語句を含むメッセージがDiscordのサーバーに投稿されたとき、このメッセージを削除する。"
}

export default BallonBurier;
