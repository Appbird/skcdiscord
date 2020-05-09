"use strict";

import ICommandBase from "../Base/ICommandBase";
import { Message } from "discord.js";
import IFunctionBase from "../Base/IFunctionBase";

let ready:ICommandBase[] = [{
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
let Ready:IFunctionBase = {
    functionName: "Ready",
    commands: ready
}
export default Ready;