import {Message} from "discord.js";
import allOfReact from "./helper/reactToEvents";
import client from "./client";
import getEnvVariable from "./helper/programHelperFunctions/helperAboutVariable";

for (const reacts of allOfReact){
    client.on(reacts.eventType, (...args)=>{
        if(reacts.eventType === "message" ){
            let msg:Message = args[0]
            if (msg.author.id === getEnvVariable("botId")) return;
        }
        for (const func of reacts.processes){
            func(...args);
        }
    }
    )
}

client.login(getEnvVariable("BOT_TOKEN"));
