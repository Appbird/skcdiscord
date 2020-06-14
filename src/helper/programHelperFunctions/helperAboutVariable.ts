import { existsSync, readFileSync } from "fs";
const path = "./envVariables.json";
const EnvData = (existsSync(path)) ? JSON.parse(readFileSync(path,"utf8")):process.env;
export default function getEnvVariable(name:string){
    if (!EnvData.hasOwnProperty(name)) throw new Error(`環境変数${name}は存在しません。`)
    return EnvData[name];
}