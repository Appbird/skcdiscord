import ICommandBase from "../../Base/ICommandBase";
import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import IFunctionBase from "../../Base/IFunctionBase";
import standardData, { addCmdChannelIdState, removeCmdChannelIdState } from "../../Data/standardData";
import client from "../../client";

const cmd:ICommandBase[] = [
    {commandTitle:"add",
    numberOfTokenRequired:2,
    argsForDescription:[],
    process: (msg) => {
        if (standardData.addCmdChannelId(msg.channel.id) === addCmdChannelIdState.alreadyadded){
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
        msg.channel.send(
        embedMessageMaker(
            `このチャンネルをコマンドチャンネルとして登録しました。`,
            CmdChannelManager.realFuncName,
            `今後はこのチャンネルにもコマンドを打ち込むことができます。`,
            [],
            new Date(),
            embedMsgState.Success
        ))
    },
        description: "コマンドを受け付けるチャンネルを増やします。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。",

    },
    {
    commandTitle:"remove",
    numberOfTokenRequired:2,
    argsForDescription:[],
    process: (msg) => {
        if (standardData.removeCmdChannelId(msg.channel.id) === removeCmdChannelIdState.notChannelFound)return;
        msg.channel.send(
        embedMessageMaker(
            `このチャンネルをコマンドチャンネルとして登録しました。`,
            CmdChannelManager.realFuncName,
            `今後はこのチャンネルにもコマンドを打ち込むことができます。`,
            [],
            new Date(),
            embedMsgState.Success
        ))
    },
        description: "コマンドを受け付けるチャンネルを減らす。\n対象となるのはこのコマンドが打ち込まれたチャンネルです。",

    },
    {
        commandTitle:"show",
        numberOfTokenRequired:2,
        argsForDescription:[],
        process: (msg) => {

            msg.channel.send(
                embedMessageMaker(
                    `コマンドを打ち込んで反応できるチャンネルの一覧です。`,
                    CmdChannelManager.realFuncName,
                    `リアクトの結果は主要チャンネルに発信されます。`,
                    standardData.cmdChannelId.map(
                        (id,index) => {
                            const channelName = client.channels.cache.get(id)?.toString();
                            if(channelName === undefined) return {name:"取得できませんでした",value:"-",inline:false};
                        return {
                            name: (index===0) ? "主要チャンネル":"サブチャンネル",
                            value: channelName,
                            inline: false
                        }
                        }
                    ),
                    new Date(),
                    embedMsgState.Success
                ))
            
        },
            description: "コマンドを受け付けるチャンネルの一覧を確認します。",
    
        },

]
const CmdChannelManager:IFunctionBase = {
    functionName: "cmdcm",
    realFuncName: "CmdChannelManager",
    reacts: [],
    commands: cmd,
    description: "コマンドを受け付けるチャンネルを増加する。"
}
export default CmdChannelManager;