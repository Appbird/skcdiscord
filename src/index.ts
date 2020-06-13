import {Client, Message, DiscordAPIError, Guild} from "discord.js";
import allOfReact from "./helper/reactToEvents";
import {StandardDataManager} from "./Data/standardData";
import client from "./client";
import release from "./releaseConfig";

for (const reacts of allOfReact){
    client.on(reacts.eventType, (...args)=>{
        if(reacts.eventType === "message" ){
            let msg:Message = args[0]
            if (msg.author.id === StandardDataManager.getBotId()) return;
        }
        for (const func of reacts.processes){
            func(...args);
        }
    }
    )
}


client.login(StandardDataManager.getToken());
