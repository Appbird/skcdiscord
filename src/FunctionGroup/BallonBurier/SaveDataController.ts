import { TargetWordColumn } from "./Base/TargetWordColumn";
import fs from "fs";
import logger from "../../test/logger";
import helperAboutFiles from "../../helper/programHelperFunctions/helperAboutFiles";


const SaveDataController = {
    load():TargetWordColumn[]{
        return helperAboutFiles.loadJSONFromlFileInDataBase("targetWordList.json").saved;
    },
    save(data:TargetWordColumn[]){
        return helperAboutFiles.saveJSONDataInDataBase("targetWordList.json",{saved:data});
    }
}
export default SaveDataController;