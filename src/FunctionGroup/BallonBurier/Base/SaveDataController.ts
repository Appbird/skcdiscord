import { TargetWordColumn } from "./TargetWordColumn";
import helperAboutFiles from "../../../helper/programHelperFunctions/helperAboutFiles";
import { deflate } from "zlib";


const SaveDataController = {
    load():TargetWordColumn[]{
        let data = helperAboutFiles.loadJSONFromlFileInDataBase("BallonBurier/targetWordList.json");
        if (data == undefined) data.saved = []
        return data;
    },
    save(data:TargetWordColumn[]){
        return helperAboutFiles.saveJSONDataInDataBase("BallonBurier/targetWordList.json",{saved:data});
    },
    configLoad():IConfig{
        let data = helperAboutFiles.loadJSONFromlFileInDataBase("BallonBurier/config.json");
        if (data == undefined) data = {
            idOfChannelWhichItOutputReactLogTo: ""
        }
        return data;
    },
    configSave(data:IConfig){
        return helperAboutFiles.saveJSONDataInDataBase("BallonBurier/config.json",data)
    }

}
export default SaveDataController;

interface IConfig{
    idOfChannelWhichItOutputReactLogTo:string
}