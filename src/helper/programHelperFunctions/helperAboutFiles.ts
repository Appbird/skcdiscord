import { readFileSync, writeFileSync } from "fs";

const helperAboutFiles = {
    loadJSONFromlFileInDataBase(fileName:string):any{
        let file = "";
        try {
             file = readFileSync(`./database/${fileName}`,{encoding:"utf-8"},)
        }catch(e){
            return undefined;
        }
        return JSON.parse(file);
    },
    saveJSONDataInDataBase(fileName:string,data:any):void{
        writeFileSync(`./database/${fileName}`,JSON.stringify(data));
    }
}
export default helperAboutFiles;