import { readFileSync, writeFileSync, fstat, existsSync, mkdir, mkdirSync } from "fs";
import release from "../releaseConfig";

const helperAboutFiles = {
    loadJSONFromlFileInDataBase(fileName:string):any{
        if (release){
            fileName = fileName.replace(/[\\|/]/g,"_");
            return process.env[fileName];
        } else {
            return  this._loadJSONFromlFileInDataBase(fileName);
        }
    },
    saveJSONDataInDataBase(fileName:string,data:any):void{
        if (release){
            fileName = fileName.replace(/[\\|/]/g,"_");
            process.env[fileName] = JSON.stringify(data);
        } else {
            this._saveJSONDataInDataBase(fileName,data);
        }
    },
    _loadJSONFromlFileInDataBase(fileName:string):any{
        let file = "";
        try {
             file = readFileSync(`${__dirname}\\..\\..\\..\\..\\database\\${fileName}`,{encoding:"utf-8"})
        }catch(e){
            return undefined;
        }
        return JSON.parse(file);
    },
    _saveJSONDataInDataBase(fileName:string,data:any):void{
        const folders = fileName.split(/[\\|/]/).slice(undefined,-1);
        folders.unshift("database");
        let depth = 1;
            for (const folderName of folders){
                if (!existsSync(`${__dirname}\\..\\..\\..\\..\\${folders.slice(undefined,depth).join("\\")}`))
                                mkdirSync(`${__dirname}\\..\\..\\..\\..\\${folders.slice(undefined,depth).join("\\")}`);
                depth++;
            }

        writeFileSync(`${__dirname}\\..\\..\\..\\..\\database\\${fileName}`,JSON.stringify(data),{flag:"w"});
    }
    
}

export default helperAboutFiles;