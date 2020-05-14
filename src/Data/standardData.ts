import helperAboutFiles from "../helper/programHelperFunctions/helperAboutFiles";
import release from "../helper/releaseConfig";

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
        let data = helperAboutFiles.loadJSONFromlFileInDataBase("standard.json");
        if (data === undefined){
            data = {
                botId: "708688091556216894",
                cmdChannelId: []
            }
        }
        this.botId = data.botId;
        this.cmdChannelId = data.cmdChannelId;
        this.t = undefined;
        if (!release){
            this.t = helperAboutFiles.loadJSONFromlFileInDataBase("t.json").t;
        }
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
        this.cmdChannelId = this.cmdChannelId.filter(element => element !== removedId);
        if　(lengthBeforeProcess === this.cmdChannelId.length) return removeCmdChannelIdState.notChannelFound;
        this._save();
        return removeCmdChannelIdState.success;
    }
    private _save(){
        helperAboutFiles.saveJSONDataInDataBase("standard.json",
        {
            "cmdChannelId":this.cmdChannelId,
            "botId": this.botId,
        })
    }
    cmdChannelId:string[];
    botId:string;
    t:string | undefined;
}
const standardData = new StandardDataOwner();

export default standardData;