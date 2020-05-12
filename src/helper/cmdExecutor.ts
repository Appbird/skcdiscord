import { Message } from "discord.js";
import functionSet from "../FunctionGroup/functionSet";
import _ from "lodash";
import helperAboutError from "./helperAboutError";

export default function executeCmd(msg:Message):void{

    let tokenArray = devideIntoTokens(msg.content);
    if (tokenArray.length < 2){
        helperAboutError.throwErrorToDiscord(msg.channel,"メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }

    let usedFunctionIndex = _.findIndex(functionSet,func => tokenArray[0] === func.functionName);
    //CTODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    //lodashパッケージを使うことで解決。とても便利。
    if (usedFunctionIndex === -1) {
        let functionNameList = "";
        for( const ele of functionSet){
            functionNameList += "- " + ele.functionName + "\n";
        }
        let sent = `指定された機能は存在しません。
                    存在するのは以下の機能です。
                    ${functionNameList}`;
        helperAboutError.throwErrorToDiscord(msg.channel,sent);
        return;
    }

    let selectedCmdIndex = _.findIndex(functionSet[usedFunctionIndex].commands,cmd => cmd.commandTitle===tokenArray[1]);
    if (selectedCmdIndex === -1) {
        helperAboutError.throwErrorToDiscord(msg.channel,"そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    functionSet[usedFunctionIndex].commands[selectedCmdIndex].process(msg,tokenArray);

}

export function devideIntoTokens(str:string){
    let tokenArray = str.slice(1).split(/\s+/g);
    if (tokenArray.length < 2) return [];
    tokenArray[0] = tokenArray[0].toLowerCase();
    tokenArray[1] = tokenArray[1].toLowerCase();
    return tokenArray;
}