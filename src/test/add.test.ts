import {add} from "../FunctionGroup/BallonBurier/cmd";
import { Client } from "discord.js";
import { devideIntoTokens } from "../helper/cmdExecutor";
import standardData from "../Data/standardData";
import logger from "./logger";



const client = new Client();

client.on("message", (msg) => {
    if (msg.author.id === standardData.botID) return;
    logger.debug("start");
    let tokens = devideIntoTokens(msg.content);
    add(msg,tokens);
});


client.login(standardData.tokenId);