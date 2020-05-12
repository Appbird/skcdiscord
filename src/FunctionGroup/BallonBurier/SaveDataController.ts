import { TargetWordColumn } from "./Base/TargetWordColumn";
import fs from "fs";

const SaveDataController = {

    load():TargetWordColumn[]{
        return JSON.parse(fs.readFileSync("./targetWordList.json",{encoding:"utf-8",flag:"a"}));
    },
    save(data:TargetWordColumn[]):void{
        fs.writeFileSync("./targetWordList.json",JSON.stringify(data));
    }
}
export default SaveDataController;