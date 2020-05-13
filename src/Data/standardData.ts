import helperAboutFiles from "../helper/programHelperFunctions/helperAboutFiles";
import helperAboutError from "../helper/programHelperFunctions/helperAboutError";
import { TextChannel, DMChannel, NewsChannel } from "discord.js";
import client from "../client";
import { embedMessageMaker } from "../helper/embedMessageMaker";

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
class StandardDataOwner{
    constructor (){
        const data = helperAboutFiles.loadJSONFromlFileInDataBase("standard.json");
        this.botId = data.botId;
        this.cmdChannelId = data.cmdChannelId;
        this.tokenId = data.token
    }
    public findCmdChannelId(channelId:string){
        return this.cmdChannelId.findIndex(registeredCh => registeredCh === channelId) !== -1;
    }
    public addCmdChannelId(channelId:string):addCmdChannelIdState{
        if (this.findCmdChannelId(channelId)) return addCmdChannelIdState.alreadyadded;
        this.cmdChannelId.push(channelId);
        this._save();
        return addCmdChannelIdState.success;

    }
    public removeCmdChannelId(removedId:string):removeCmdChannelIdState{
        const lengthBeforeProcess = this.cmdChannelId.length;
        this.cmdChannelId = this.cmdChannelId.filter(element => element === removedId);
        const channelSentMsg = client.channels.cache.get(this.cmdChannelId[0]);
        if (channelSentMsg === undefined) return removeCmdChannelIdState.notChannelFound;
        this._save();
        return removeCmdChannelIdState.success;
    }
    private _save(){
        helperAboutFiles.saveJSONDataInDataBase("standard.json",
        {
            "cmdChannel":this.cmdChannelId,
            "botId": this.botId,
            "tokenId": this.tokenId
        })
    }
    cmdChannelId:string[];
    tokenId:string;
    botId:string;
}
const standardData = new StandardDataOwner();

export default standardData;