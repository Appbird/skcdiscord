import {  TextChannel, DMChannel, NewsChannel } from "discord.js";
import { embedMsgState, embedMessageMaker, IEmbedMessageField } from "../embedMessageMaker";

let helperAboutError = {
    throwErrorToDiscord(targetChannel:TextChannel|DMChannel|NewsChannel,content:string,description?:string,fields?:IEmbedMessageField[]){

            targetChannel.send(embedMessageMaker(
                `${content}`,
                "ErrorRepoter",
                (description!==undefined)? description : "",
                (fields!==undefined)? fields : [],
                new Date(),
                 embedMsgState.Error
            ))
    }
}

export default helperAboutError;