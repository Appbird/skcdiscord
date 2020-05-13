import IFunctionBase from "../../Base/IFunctionBase";
import ICommandBase from "../../Base/ICommandBase";
import IReactBase from "../../Base/IReactBase";
import { add, remove, show } from "./cmd";
import buryWord from "./react";
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
