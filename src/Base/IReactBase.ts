"use strict";
import {ClientEvents} from "discord.js";
import IReactProcess from "./IReactProcess";

export default interface IReactBase<K extends keyof ClientEvents>{
    eventType:K;
    reactName:string;
    process:IReactProcess<K>;
}