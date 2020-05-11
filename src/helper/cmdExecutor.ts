import { Message } from "discord.js";
import functionSet from "../FunctionGroup/functionSet";
import _ from "lodash";

export default function executeCmd(msg:Message):void{
    let TokenArray = msg.content.split(/\s+/g);
    if (TokenArray.length < 2){
        msg.channel.send("error > メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }

    let usedFunctionIndex = _.findIndex(functionSet,func => TokenArray[0] === func.functionName);
    //CTODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    //lodashパッケージを使うことで解決。とても便利。
    if (usedFunctionIndex) {
        msg.channel.send("error > 指定された機能は存在しません。");
        return;
    }

    let selectedCmdIndex = _.findIndex(functionSet[usedFunctionIndex].commands,cmd => cmd.commandTitle===TokenArray[1]);
    if (selectedCmdIndex) {
        msg.channel.send("error > そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    functionSet[usedFunctionIndex].commands[selectedCmdIndex].process(msg,TokenArray);

}