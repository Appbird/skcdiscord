import { StandardDataManager, addCmdChannelIdState } from "../../Data/standardData";
import { Message } from "discord.js";
import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import CmdChannelManager from "./CmdChannelManager";
import client from "../../client";

export function remove(msg:Message){

    StandardDataManager.removeCmdChannelId(msg.channel.id).then(
        () => {
        msg.channel.send(
        embedMessageMaker(
            `このチャンネルをコマンドチャンネルから外しました。`,
            CmdChannelManager.realFuncName,
            `今後はこのチャンネルはコマンドを受け付けません。`,
            [],
            new Date(),
            embedMsgState.Success
        ))
        }
    )
}
export function show(msg:Message){
    StandardDataManager.getCmdChannelId().then(
        (cmdChannelId) => {
    msg.channel.send(
        embedMessageMaker(
            `コマンドを打ち込んで反応できるチャンネルの一覧です。`,
            CmdChannelManager.realFuncName,
            `リアクトの結果は主要チャンネルに発信されます。`,
            cmdChannelId.map(
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
    }
    );
}

export async function react_add(msg:Message){
            const cmd = msg.content.toLowerCase().replace(/\s+/g,"");
            if (cmd !== ">cmdcmadd" && cmd !== ">helloworld") return;
            if ( await StandardDataManager.addCmdChannelId(msg.channel.id) === addCmdChannelIdState.alreadyadded) return;
            msg.channel.send(
                embedMessageMaker(
                    `このチャンネルをコマンドチャンネルとして登録しました。`,
                    CmdChannelManager.realFuncName,
                    `今後はこのチャンネルにもコマンドを打ち込むことができます。`,
                    [],
                    new Date(),
                    embedMsgState.Success
                )
            )
}