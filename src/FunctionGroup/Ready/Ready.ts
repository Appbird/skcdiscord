"use strict";

import ICommandBase from "../../Base/ICommandBase";
import IFunctionBase from "../../Base/IFunctionBase";
import IReactBase from "../../Base/IReactBase";

let cmd:ICommandBase[] = [
    {   commandTitle :".",
        numberOfTokenRequired:2,
        description: "文字列`OK> \\n 3 2 1 GO!>`を特定のチャンネルにメッセージとして投稿する。",
        argsForDescription: [],
        process : msg => {msg.channel.send("OK > \n 3,2,1 GO! >");}
    }
];
let rt:IReactBase<"message">[] = [{
        reactName: "react to ready",
        eventType: "message",
        process: msg => {if(msg.content === "ready") msg.channel.send("REACT >")}
    }];

/**
 * Ready function
 * https://scrapbox.io/minimumAppbirdlications/SKcDiscordServant%2FReady
 */

let Ready:IFunctionBase = {
    functionName: "ready",
    realFuncName: "READY",
    commands: cmd,
    reacts: rt,
    description: "コマンドを打つと特定の文字列を出力するテスト機能。"
};
export default Ready;


