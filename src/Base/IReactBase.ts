"use strict";
import {ClientEvents} from "discord.js";

export default interface IReactBase<K extends keyof ClientEvents>{
    eventType:K;
    process(...args:ClientEvents[K]): void;
}

