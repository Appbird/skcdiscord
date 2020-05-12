import IFunctionBase from "../../Base/IFunctionBase";
import ICommandBase from "../../Base/ICommandBase";
import IReactBase from "../../Base/IReactBase";
import { add, remove } from "./cmd";

let cmd:ICommandBase[] = [
    {
        commandTitle :"add",
        process : add
    },
    {
        commandTitle : "remove",
        process : remove
    }
];

let rt:IReactBase<"message">[] = [
    {   reactName: "react to ready",
        eventType: "message",
        process: msg => {if(msg.content === "ready") msg.channel.send("REACT >")}
    }
];


let BallonBurier:IFunctionBase = {
    functionName:"babu",
    commands:cmd,
    reacts:rt
}

export default BallonBurier;
