import { TargetWordColumn } from "./Base/TargetWordColumn";


const SaveDataController = {

    load():TargetWordColumn[]{
        return [new TargetWordColumn("あ")];
    },
    save(data:TargetWordColumn[],title:string):void{
        JSON.stringify(data);
        return;
    }
}
export default SaveDataController;