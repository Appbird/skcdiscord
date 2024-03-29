import { Message } from "discord.js";
import functionSet from "../FunctionGroup/functionSet";
import helperAboutError from "./programHelperFunctions/helperAboutError";
import { embedMessageMaker } from "./embedMessageMaker";
import { giveArgsOfHelpEmbedMsgAboutFunction, giveArgsOfHelpEmbedMsgAboutCmd } from "./giveArgsOfHelpEmbedMsg";

export default function executeCmd(msg:Message):void{

    //コマンドとして成立しているか
    let tokenArray = devideIntoTokens(msg.content);
    //まずhelpコマンドの確認
    // CH:このhelp機能を一つの機能として独立させられないものか…。
    if(tokenArray[0]==="help"){
        msg.channel.send(embedMessageMaker(...giveArgsOfHelpEmbedMsgAboutFunction()));
        if (tokenArray[1]==="-all"){
            for (let i = 0;i<functionSet.length;i++) msg.channel.send(embedMessageMaker(...giveArgsOfHelpEmbedMsgAboutCmd(i)));
            msg.channel.send
        }
        return;
    }
    if (tokenArray.length < 2){
        helperAboutError.throwErrorToDiscord(msg.channel,"メッセージの内、機能名かコマンド名のどちらかが欠けています。");
        return;
    }

    //機能が存在するか
    let usedFunctionIndex = functionSet.findIndex(func => tokenArray[0] === func.functionName.toLowerCase());
    if (usedFunctionIndex === -1) {
        helperAboutError.throwErrorToDiscord(msg.channel,"指定された機能は存在しません","\`-h\`フラグを用いて存在する機能についてざっくり調べることが出来ます。");
        return;
    }

    //コマンドが機能内に存在するか？
        //その前に-hフラグの確認
        if(tokenArray[1]==="-h"){
            msg.channel.send(embedMessageMaker(...giveArgsOfHelpEmbedMsgAboutCmd(usedFunctionIndex)));
            return;
        }

    let selectedCmdIndex = functionSet[usedFunctionIndex].commands.findIndex(cmd => cmd.commandTitle.toLowerCase()===tokenArray[1]);
    if (selectedCmdIndex === -1) {
        helperAboutError.throwErrorToDiscord(msg.channel,"そのコマンドは、指定された機能中に存在しません。",`\`-h\`フラグを用いてこのコマンドについて調べることが出来ます。`);
    return;
    }

    const requiredNumber = functionSet[usedFunctionIndex].commands[selectedCmdIndex].numberOfTokenRequired;
    if (tokenArray.length < requiredNumber){
        helperAboutError.throwErrorToDiscord(msg.channel,"コマンドの引数が少なすぎます。",`本来${requiredNumber-2}個必要であるのに対し${tokenArray.length-2}個しかありません`);
        return;
    }
    functionSet[usedFunctionIndex].commands[selectedCmdIndex].process(msg,tokenArray);
    console.log(`cmd ${msg.content} has been launched!`);
}

export function devideIntoTokens(str:string){
    let tokenArray = str.slice(1).split(/\s+/g);
    tokenArray[0] = tokenArray[0].toLowerCase();
    if (tokenArray.length < 2) return [tokenArray[0]];
    tokenArray[1] = tokenArray[1].toLowerCase();
    return tokenArray;
}


