"use strict";
import {Message} from "discord.js";
import CommandProcess from "./CommandProcess";

export default interface IReceiveBase{
    eventType:string;
    process:CommandProcess;
}