"use strict";

import ICommandBase from "../Base/ICommandBase";
import { Message } from "discord.js";
import IFunctionBase from "../Base/IFunctionBase";
import IReactBase from "../Base/IReactBase";
import {ClientEvents} from "discord.js";

let cmd:ICommandBase[] = [{
    commandTitle :".",
    process : async (message:Message) => {
        try {
            await message.channel.send("OK > \n 3,2,1 GO!>");
            return true;
        }
        catch (e) {
            return false;
        }

    }
}];
let rt:IReactBase<"message"> = {
    eventType: "message",
    process: msg => {
        if(msg.content === "ready")msg.channel.send("REACT >")
    }
};


let Ready:IFunctionBase = {
    functionName: "ready",
    commands: cmd,
    reacts: [rt]
};
export default Ready;


