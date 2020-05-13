import { readFileSync, writeFileSync } from "fs";

const helperAboutFiles = {
    loadJSONFromlFileInDataBase(fileName:string):any{
        return JSON.parse(readFileSync(`./database/${fileName}`,{encoding:"utf-8"}));
    },
    saveJSONDataInDataBase(fileName:string,data:any):void{
        writeFileSync(`./database/${fileName}`,JSON.stringify(data));
    }
}
export default helperAboutFiles;