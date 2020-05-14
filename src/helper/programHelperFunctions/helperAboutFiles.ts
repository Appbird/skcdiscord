import { readFileSync, writeFileSync, fstat, existsSync, mkdir, mkdirSync } from "fs";
import logger from "../../test/logger";

const helperAboutFiles = {
    loadJSONFromlFileInDataBase(fileName:string):any{
        fileName = fileName.replace(/[\\|/]/g,"_");
        return process.env[fileName];
    },
    saveJSONDataInDataBase(fileName:string,data:any):void{
        fileName = fileName.replace(/[\\|/]/g,"_");
        process.env[fileName] = data;
    }
    /*
    loadJSONFromlFileInDataBase(fileName:string):any{
        let file = "";
        try {
             file = readFileSync(`${__dirname}\\..\\..\\..\\..\\database\\${fileName}`,{encoding:"utf-8"})
        }catch(e){
            return undefined;
        }
        return JSON.parse(file);
    },
    saveJSONDataInDataBase(fileName:string,data:any):void{
        const folders = fileName.split(/[\\|/]/).slice(undefined,-1);
        folders.unshift("database");
        logger.debug(folders);
        let depth = 1;
            for (const folderName of folders){
                if (!existsSync(`${__dirname}\\..\\..\\..\\..\\${folders.slice(undefined,depth).join("\\")}`))
                                mkdirSync(`${__dirname}\\..\\..\\..\\..\\${folders.slice(undefined,depth).join("\\")}`);
                depth++;
            }

        writeFileSync(`${__dirname}\\..\\..\\..\\..\\database\\${fileName}`,JSON.stringify(data),{flag:"w"});
    }
    */
}

export default helperAboutFiles;