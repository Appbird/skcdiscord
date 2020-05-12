import {Client, Message} from "discord.js";
import allOfReact from "./helper/reactToEvents";
import standardData from "./Data/standardData";

const client = new Client();

for (const reacts of allOfReact){
    client.on(reacts.eventType, (...args)=>{
        if(reacts.eventType === "message" ){
            let msg:Message = args[0]
            if (msg.author.id === standardData.botID) return;
        }
        for (const func of reacts.processes){
            func(...args);
        }
    }
    )
}
client.login(standardData.tokenId);