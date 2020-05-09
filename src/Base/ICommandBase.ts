"use strict";

import { Message } from "discord.js";
import CommandProcess from "./CommandProcess";

export default interface ICommandBase {
    commandTitle:string;
    process:CommandProcess;
}