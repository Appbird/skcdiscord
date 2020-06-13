import { TargetWordColumn } from "./TargetWordColumn";
import helperAboutFiles from "../../../helper/programHelperFunctions/helperAboutFiles";
import { deflate } from "zlib";


const SaveDataController = {
    async load():Promise<TargetWordColumn[]>{
        let data = await helperAboutFiles.fetchJSONDataFromDiscordDataBase("BallonBurier/targetWordList.json");
        if (data == undefined) data = {saved:[]}
        return data.saved;
    },
    async save(data:TargetWordColumn[]){
        return helperAboutFiles.saveJSONFromDiscordDataBase("BallonBurier/targetWordList.json",{saved:data});
    },
    async configLoad():Promise<IConfig>{
        let data = await helperAboutFiles.fetchJSONDataFromDiscordDataBase("BallonBurier/config.json");
        if (data == undefined) data = {
            idOfChannelWhichItOutputReactLogTo: ""
        }
        return data;
    },
    async configSave(data:IConfig){
        helperAboutFiles.saveJSONFromDiscordDataBase("BallonBurier/config.json",data)
    }

}
export default SaveDataController;

interface IConfig{
    idOfChannelWhichItOutputReactLogTo:string
}