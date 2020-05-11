import { Message } from "discord.js";
import functionSet from "../FunctionGroup/functionSet";
import _ from "lodash";

export default function executeCmd(msg:Message):void{
    let msgLow = msg.content.toLowerCase();
    let TokenArray = msgLow.slice(1).split(/\s+/g);
    if (TokenArray.length < 2){
        msg.channel.send("error > メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }

    let usedFunctionIndex = _.findIndex(functionSet,func => TokenArray[0] === func.functionName);
    //CTODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    //lodashパッケージを使うことで解決。とても便利。
    
    if (usedFunctionIndex === -1) {
        let functionNameList = "";
        for( const ele of functionSet){
            functionNameList += "- " + ele.functionName + "\n";
        }
        let sent = "error > 指定された機能は存在しません。\n存在するのは以下の機能です。\n" + functionNameList;
        msg.channel.send(sent);
        return;
    }

    let selectedCmdIndex = _.findIndex(functionSet[usedFunctionIndex].commands,cmd => cmd.commandTitle===TokenArray[1]);
    if (selectedCmdIndex === -1) {
        msg.channel.send("error > そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    functionSet[usedFunctionIndex].commands[selectedCmdIndex].process(msg,TokenArray);

}