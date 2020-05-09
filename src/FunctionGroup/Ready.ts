"use strict";

import ICommandBase from "../Base/ICommandBase";
import { Message } from "discord.js";
import IFunctionBase from "../Base/IFunctionBase";

let ready:ICommandBase[] = [{
    commandTitle :".",
    process : (message:Message) => {
        message.channel.send("OK > \n 3,2,1 GO!>");
        return true;
    }
}];
let Ready:IFunctionBase = {
    functionName: "ICommandBase",
    commands: ready
}
export default Ready;