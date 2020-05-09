"use strict";

import ICommandBase from "./ICommandBase";
import IReceiveBase from "./IReceiveBase";

export default interface IFunctionBase {
    commands?:ICommandBase[];
    //特定イベントが発生したときに実行されるプロセス。
    receive?:IReceiveBase[];
    functionName:string;
}