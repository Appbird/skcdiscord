import {  TextChannel, DMChannel, NewsChannel } from "discord.js";

let helperAboutError = {
    throwErrorToDiscord(targetChannel:TextChannel|DMChannel|NewsChannel,content:string){
        targetChannel.send(`ERROR > ${content}`);
    }
}

export default helperAboutError;