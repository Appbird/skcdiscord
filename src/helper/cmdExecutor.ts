import { Message } from "discord.js";
import functionSet from "../FunctionGroup/functionSet";

export default function proceedCmd(msg:Message):void{
    let TokenArray = msg.content.split(/\s+/g);
    if (TokenArray.length < 2){
        msg.channel.send("error > メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }

    let usedFunction = functionSet.filter(func => TokenArray[0] === func.functionName);
    // TODO:ここではfindメソッドを使えるはずだが、何故か使えなかった。
    if (usedFunction.length === 0) {
        msg.channel.send("error > 指定された機能は存在しません。");
        return;
    } else if(typeof usedFunction[0].commands === "undefined"){
        msg.channel.send("error > 指定された機能はコマンドを受け付けていません。");
        return;
    }

    let selectedCmd = usedFunction[0].commands.filter(cmd => TokenArray[1]===cmd.commandTitle);
    if (selectedCmd.length === 0) {
        msg.channel.send("error > そのコマンドは、指定された機能中に存在しません。");
        return;
    }
    selectedCmd[0].process(msg,TokenArray);

}