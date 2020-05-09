"use strict";

import ICommandBase from "./ICommandBase";
import IReactBase from "./IReactBase";

export default interface IFunctionBase {
    commands?:ICommandBase[];
    //特定イベントが発生したときに実行されるプロセス。
    receive?:IReactBase[];
    functionName:string;
}