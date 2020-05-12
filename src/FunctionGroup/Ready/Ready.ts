"use strict";

import ICommandBase from "../../Base/ICommandBase";
import { Message } from "discord.js";
import IFunctionBase from "../../Base/IFunctionBase";
import IReactBase from "../../Base/IReactBase";

let cmd:ICommandBase[] = [
    {   commandTitle :".",
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
    commands: cmd,
    reacts: rt
};
export default Ready;


