import {Client, Message} from "discord.js";
import allOfReact from "./helper/reactToEvents";
import standardData from "./Data/standardData";
import client from "./client";

for (const reacts of allOfReact){
    client.on(reacts.eventType, (...args)=>{
        if(reacts.eventType === "message" ){
            let msg:Message = args[0]
            if (msg.author.id === standardData.botId) return;
        }
        for (const func of reacts.processes){
            func(...args);
        }
    }
    )
}
client.login(process.env.BOT_TOKEN);
console.log(`logged in as ${client.user?.tag}`);