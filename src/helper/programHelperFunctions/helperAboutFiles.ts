import client from "../../client";
import { TextChannel,Channel, Client, MessageEmbed, MessageAttachment} from "discord.js";
import fetch from "node-fetch";
import { readFileSync } from "fs";
import getEnvVariable from "./helperAboutVariable";
const helperAboutFiles = {
    //CH: これバイナリとして保存できない？
    async fetchJSONDataFromDiscordDataBase(fileName:string){
        const escapedFileName = escapeFileName(fileName);
        const ch = findFileTextChannel(client);
        const dataOrURL = (await findAttachmentFromChannel(escapedFileName,ch))?.attachmentInMsg.attachment;
        if (dataOrURL === undefined) return undefined;
        console.info(`load: ${dataOrURL} (${typeof dataOrURL}) as ${escapedFileName}`)
        
        return (typeof dataOrURL === "string") ? await (await fetch(dataOrURL)).json():JSON.parse(dataOrURL.toString());
    },
    async saveJSONFromDiscordDataBase(fileName:string,data:any){
        const escapedFileName = escapeFileName(fileName);
        const savedDataInText = JSON.stringify(data);
        const savedDataInBuffer = Buffer.from(savedDataInText);
        const ch = findFileTextChannel(client);
        const attachmentAsTarget = await findAttachmentFromChannel(escapedFileName,ch);
        console.info(`saved: ${savedDataInText} as ${escapedFileName}`)
        if (attachmentAsTarget !== undefined){
            attachmentAsTarget.msg.delete();
        }
        
        ch.send(new MessageAttachment(savedDataInBuffer,escapedFileName));
    }
}

function escapeFileName(fileName:string){
    return fileName.replace(/[\/\\]/g,"__")
}
async function findAttachmentFromChannel(attachmentName:string,ch:TextChannel){
    const messages = await ch.messages.fetch({ limit: 50});
    for (const msg of messages.array()){
        const data = msg.attachments.find( attachment => attachment.name === attachmentName);
        if (data === undefined) continue;
        return {attachmentInMsg:data,msg:msg};
    }
}
export default helperAboutFiles;

function ChIsTextCh(ch:Channel):ch is TextChannel{
    return ch.type === "text"
}
function findFileTextChannel(client:Client):TextChannel{
    const textCh = findFileVault(client)?.channels.cache.find( ( channel => channel.name === "filevault" ));
    if (textCh === undefined) throw new Error("テキストチャンネルを取得できませんでした。");
    if (!ChIsTextCh(textCh)) throw new Error("取得したチャンネルがテキストチャンネルではありませんでした。");
    return textCh;

}
function findFileVault(client:Client){
    return client.guilds.resolve(getEnvVariable("guildId"));
}