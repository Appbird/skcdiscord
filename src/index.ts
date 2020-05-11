import {Client} from "discord.js";
import allOfReact from "./helper/reactToEvents";
import standardData from "./Data/standardData";

const client = new Client();

for (const reacts of allOfReact){
    client.on(reacts.eventType, (...args)=>{
        for (const func of reacts.processes){
            func(...args);
        }
    }
    )
}
client.login(standardData.tokenId);