import ICommandBase from "../../Base/ICommandBase";
import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import IFunctionBase from "../../Base/IFunctionBase";
import standardData, { addCmdChannelIdState, removeCmdChannelIdState } from "../../Data/standardData";
import client from "../../client";
import IReactBase from "../../Base/IReactBase";

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
        standardData.removeCmdChannelId(msg.channel.id);
        msg.channel.send(
        embedMessageMaker(
            `このチャンネルをコマンドチャンネルから外しました。`,
            CmdChannelManager.realFuncName,
            `今後はこのチャンネルはコマンドを受け付けません。`,
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
                    embedMsgState.Normal
                ))

        },
            description: "コマンドを受け付けるチャンネルの一覧を確認します。",

        },

]

const rt_m:IReactBase<"message"> = 
    {
        
        eventType:"message",
        reactName:"add",
        process:(msg) => {
            if (standardData.findCmdChannelId(msg.channel.id)) return;
            
            const cmd = msg.content.toLowerCase().replace(/\s+/g,"");
            if (cmd !== ">cmdcmadd" && cmd !== ">helloworld") return;
            standardData.addCmdChannelId(msg.channel.id);
            msg.channel.send(
                embedMessageMaker(
                    `このチャンネルをコマンドチャンネルとして登録しました。`,
                    CmdChannelManager.realFuncName,
                    `今後はこのチャンネルにもコマンドを打ち込むことができます。`,
                    [],
                    new Date(),
                    embedMsgState.Success
                ))
        }
    }
const rt_cD:IReactBase<"channelDelete">={
    eventType :"channelDelete",
    reactName : "add",
    process: (ch) => {
        standardData.removeCmdChannelId(ch.id)
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