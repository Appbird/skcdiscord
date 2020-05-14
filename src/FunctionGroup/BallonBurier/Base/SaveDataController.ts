import { TargetWordColumn } from "./TargetWordColumn";
import helperAboutFiles from "../../../helper/programHelperFunctions/helperAboutFiles";


const SaveDataController = {
    load():TargetWordColumn[]{
        return helperAboutFiles.loadJSONFromlFileInDataBase("BallonBurier/targetWordList.json").saved;
    },
    save(data:TargetWordColumn[]){
        return helperAboutFiles.saveJSONDataInDataBase("BallonBurier/targetWordList.json",{saved:data});
    },
    configLoad():IConfig{
        return helperAboutFiles.loadJSONFromlFileInDataBase("BallonBurier/config.json")
    },
    configSave(data:IConfig){
        return helperAboutFiles.saveJSONDataInDataBase("BallonBurier/config.json",data)
    }

}
export default SaveDataController;

interface IConfig{
    idOfChannelWhichItOutputReactLogTo:string
}