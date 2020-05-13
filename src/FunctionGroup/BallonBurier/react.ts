import { Message, MessageEmbed, Channel } from "discord.js";
import SaveDataController from "./SaveDataController";
import { fragConverses } from "./Base/FragConversion";
import { TargetWordColumn } from "./Base/TargetWordColumn";
import _ from "lodash";
import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import standardData from "../../Data/standardData";
import BallonBurier from "./BallonBurier";

export default function buryWord(msg:Message){
    const targetWordList = SaveDataController.load();
    let foundWord = _detectWordInMsg(msg.content,targetWordList);

    if (standardData.findCmdChannelId(msg.channel.id) && foundWord === "") return;

    msg.delete({reason:`${BallonBurier.realFuncName} > 対象となるワードが含まれていたため。`});
    let deleteCountIndex = _.findIndex(targetWordList,{word:foundWord});

    targetWordList[deleteCountIndex].timeOfBuried++;

    msg.client.channels.cache.get(standardData.cmdChannelId[0])?.send(embedMessageMaker(
            "メッセージが埋め立てられてしまいました…。",
            BallonBurier.realFuncName,
            `__**${msg.author.username}**__ > ${msg.content}`,
            [   {name:"原因",value:foundWord,inline:true},
                {name:"今まで埋め立てられた回数",value:targetWordList[deleteCountIndex].timeOfBuried.toString(),inline:true}],
            new Date(),
            embedMsgState.Success
        )
    );
}
/**
 * @param msg 受け取ったメッセージの内容
 * @param targetWordList 対象リスト
 * @return 対象を発見したときにはその対象を返し、何も発見できなかった時はWordを投げる。
 */
function _detectWordInMsg(detectedStr:string,targetWordList:TargetWordColumn[]):string{
    const converseList = _.entries(fragConverses);
    if (targetWordList === undefined) return "";

    for (const aListedWord of targetWordList){
        if (detectedStr.indexOf(aListedWord.usedWordForJudging) !== -1) return aListedWord.word;
    }
    for (const aConverse of converseList){
        detectedStr = aConverse[1](detectedStr);
        for (const aListedWord of targetWordList){
            if (detectedStr.indexOf(aListedWord.usedWordForJudging) !== -1) return aListedWord.word;
        }
    }
    return "";

}