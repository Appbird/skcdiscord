"use strict";
import {Message} from "discord.js";

export default interface IReceiveBase{
    eventType:string;
    process(message:Message):boolean;
}