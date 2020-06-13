import helperAboutFiles from "../helper/programHelperFunctions/helperAboutFiles";
import release from "../releaseConfig";
import { readFileSync } from "fs";

export enum addCmdChannelIdState{
    success,
    alreadyadded,
    failed
}
export enum removeCmdChannelIdState{
    success,
    notChannelFound,
    failed
}
export class StandardDataManager{
    public static getBotId(){
        return "708688091556216894";
    }
    public static getToken(){
        return release ? process.env["BOT_TOKEN"]:readFileSync("t.json",'utf8');
    }
    
    public static async getCmdChannelId(){
        let data:{[key:string]:string[]} | undefined = await helperAboutFiles.fetchJSONDataFromDiscordDataBase("standard.json");
        if (data === undefined) return [];
        return data.cmdChannelId;
    }
    public static async addCmdChannelId(channelId:string){
        let cmdChannelId = await StandardDataManager.getCmdChannelId();
            if (cmdChannelId.findIndex((cmd) => cmd === channelId) === -1) return addCmdChannelIdState.alreadyadded;
            cmdChannelId.push(channelId);
            StandardDataManager._save(cmdChannelId);
            return addCmdChannelIdState.success;

    }
    public static async removeCmdChannelId(removedId:string){
        let cmdChannelId = await StandardDataManager.getCmdChannelId()
        const lengthBeforeProcess = cmdChannelId.length;
        cmdChannelId = cmdChannelId.filter(element => element !== removedId);
        if　(lengthBeforeProcess === cmdChannelId.length) return removeCmdChannelIdState.notChannelFound;
        this._save(cmdChannelId);
        return removeCmdChannelIdState.success;
    }
    private static _save(cmdChannelId:string[]){
        helperAboutFiles.saveJSONFromDiscordDataBase("standard.json",
        {
            "cmdChannelId":cmdChannelId
        })
    }
}