import ICommandBase from "../../Base/ICommandBase";
import IFunctionBase from "../../Base/IFunctionBase";
import IReactBase from "../../Base/IReactBase";

import * as commandFunctions from "./cmd";

import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import { StandardDataManager } from "../../Data/standardData";

const cmd:ICommandBase[] = [
    {commandTitle:"add",
    numberOfTokenRequired:2,
    argsForDescription:[],
    process: (msg) => {
            msg.channel.send(
                embedMessageMaker(
                    `このチャンネルはすでに登録されています`,
                    CmdChannelManager.realFuncName,
                    `このチャンネルにコマンドを打ち込むことができます。`,
                    [],
                    new Date(),
                    embedMsgState.Error
                )
            )
            return;
        }
    ,
        description: "コマンドを受け付けるチャンネルを増やします。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。\n`>helloworld`でも反応します。",

    },
    {
    commandTitle:"remove",
    numberOfTokenRequired:2,
    argsForDescription:[],
    process: (msg) => {
        commandFunctions.remove(msg);
    },
        description: "コマンドを受け付けるチャンネルを減らす。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。",

    },
    {
        commandTitle:"show",
        numberOfTokenRequired:2,
        argsForDescription:[],
        process: (msg) => {
            commandFunctions.show(msg);
        },
            description: "コマンドを受け付けるチャンネルの一覧を確認します。",

        },

]

const rt_m:IReactBase<"message"> = 
    {

        eventType:"message",
        reactName:"add",
        process:(msg) => {
            commandFunctions.react_add(msg);
        }
    }
const rt_cD:IReactBase<"channelDelete">={
    eventType :"channelDelete",
    reactName : "delete",
    process: (ch) => {
        StandardDataManager.removeCmdChannelId(ch.id);
    }
}

const CmdChannelManager:IFunctionBase = {
    functionName: "cmdcm",
    realFuncName: "CmdChannelManager",
    reacts: [rt_m,rt_cD],
    commands: cmd,
    description: "コマンドを受け付けるチャンネルを管理します。"
}
export default CmdChannelManager;