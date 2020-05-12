"use strict";

import { Message } from "discord.js";
import { ICmdFlag } from "../helper/cmdFrags";

export default interface ICommandBase {
    commandTitle:string;
    numberOfTokenRequired: number;
    description:string;
    allowedFlags?:ICmdFlag[];
    process(message:Message,tokenArray:string[]):void;
    argsForDescription:string[];
}