"use strict";

import { Message} from "discord.js";

export default interface ICommandBase {
    commandTitle:string;
    process(message:Message,tokenArray:string[]):Promise<boolean>;
}