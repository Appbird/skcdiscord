import {Client, Message} from "discord.js";
import proceedCmd from "./helper/cmdExecutor";

const client = new Client();
client.on("message", msgEvent);


function msgEvent(msg:Message):void{
    if (msg.channel.id === "708691948382453760" && 
        msg.content[0]===">"){
            proceedCmd(msg);
            return;
        }
}