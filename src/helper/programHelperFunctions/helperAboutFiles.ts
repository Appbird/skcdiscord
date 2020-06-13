import client from "../../client";
import { TextChannel,Channel, Client, MessageEmbed, MessageAttachment} from "discord.js";
import helperAboutError from "./helperAboutError";
import { StandardDataManager } from "../../Data/standardData";
const helperAboutFiles = {
    
        //TODO: ここのセーブデータを添付ファイルにすることで保管できないか？
    async fetchJSONDataFromDiscordDataBase(fileName:string){
        fileName = fileName.replace(/[\/\\]/g,"_")
       const ch = findFileTextChannel(client);
       let dataInText:string|undefined;
       for (const msg of ch.messages.cache.array()){
           const dataOrUndefined = msg.attachments.find( (attachment) => attachment.name === fileName)
            if (dataOrUndefined === undefined) break;
            dataInText = dataOrUndefined.attachment.toString();
       }
       if (dataInText === undefined) return undefined;
       return JSON.parse(dataInText);
    },

    saveJSONFromDiscordDataBase(fileName:string,data:any):void{
        fileName = escapeFileName(fileName);
        const savedDataInText = JSON.stringify(data);
        const ch = findFileTextChannel(client);
        let isdataSet = false;
        for (const msg of ch.messages.cache.array()){
            const dataKey = msg.attachments.findKey( (attachment) => attachment.name === fileName)
            if (dataKey === undefined) continue;
            if (msg.attachments.get(dataKey)?.setFile(savedDataInText,fileName) === undefined) throw new Error("データをセットできませんでした。")
            isdataSet = true;
        }
        if (isdataSet) return;
        /* thanks : https://github.com/discordjs/discord.js/blob/master/docs/examples/attachments.md */
        ch.send(new MessageAttachment(savedDataInText,fileName));
    }
}

function escapeFileName(fileName:string){
    return fileName.replace(/[\/\\]/g,"__")

}
export default helperAboutFiles;

function ChIsTextCh(ch:Channel):ch is TextChannel{
    return ch.type === "text"
}
function findFileTextChannel(client:Client):TextChannel{
    const textCh = findFileVault(client)?.channels.cache.find( ( channel => {
        return (channel.name === "fileVault")
    } ));
    if (textCh === undefined) throw new Error("テキストチャンネルを取得できませんでした。");
    if (!ChIsTextCh(textCh)) throw new Error("取得したチャンネルがテキストチャンネルではありませんでした。");
    return textCh;

}
function findFileVault(client:Client){
    return client.guilds.resolve("708666232311775263");
}