import { Message } from "discord.js";
import helperAboutError from "../../../helper/programHelperFunctions/helperAboutError";
import { TargetWordColumn } from "../Base/TargetWordColumn";
import SaveDataController from "../Base/SaveDataController";
import { embedMessageMaker, embedMsgState } from "../../../helper/embedMessageMaker";
import TargetWordFrags from "../Base/TargetWordFragManager";
import BallonBurier from "../BallonBurier";
import { converseWordsFollowingRules } from "./converseWordsFollowingRules";


export async function add(msg: Message, tokens: string[]){
    const wordInformation = tokens.slice(2);
    const cmdFlagsChar = wordInformation.slice(1);
    const flagManager = new TargetWordFrags();
    const addedColumn = new TargetWordColumn(wordInformation[0]);
    
    const savedTargetWordTable = await SaveDataController.load()
    addedColumn.flags = flagManager.turnOn(cmdFlagsChar, msg.channel);
    addedColumn.usedWordForJudging = converseWordsFollowingRules(addedColumn.word, flagManager);
    const isAlreadyAdded = savedTargetWordTable.findIndex(row => row.usedWordForJudging === addedColumn.usedWordForJudging) !== -1;
    if (isAlreadyAdded) {
        helperAboutError.throwErrorToDiscord(msg.channel, "既に同じ単語が登録されています。");
        return;
    }
    savedTargetWordTable.push(addedColumn);
    SaveDataController.save(savedTargetWordTable);
    let listOfFlags = flagManager.definedCmdFlags.map(ele => {
        return {
            name: (ele.state) ? `${ele.flagTitle}` : `~~${ele.flagTitle}~~`,
            value: (ele.state) ? ele.flagOnDescription : ele.flagOffDescription,
            inline: false
        };
    });
    
    if (!isAlreadyAdded)msg.channel.send(embedMessageMaker(`ワード「${addedColumn.word}」がリストに追加されました。`, BallonBurier.realFuncName, "以下の属性が適用されています。", listOfFlags, addedColumn.registeredTimeStamp, embedMsgState.Success));
    
}
