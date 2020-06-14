"use strict";

import ICommandBase from "./ICommandBase";
import IReactBase from "./IReactBase";
import { ClientEvents } from "discord.js";

export default interface IFunctionBase {
    commands:ICommandBase[];
    //特定イベントが発生したときに実行されるプロセス。
    
    reacts:IReactBase<keyof ClientEvents>[];
    functionName:string;
    realFuncName:string;
    description:string;
}