import { Message } from "discord.js";
import _ from "lodash";

import helperAboutError from "../../helper/helperAboutError";
import { TargetWordColumn } from "./Base/TargetWordColumn";
import SaveDataController from "./SaveDataController";
import embedMessageMaker from "./Base/embedMessageMaker";
import TargetWordFrags from "./Base/TargetWordFragManager";
import { fragConverses } from "./Base/FragConversion";



export function add(msg: Message, tokens: string[]): void {
    const savedTargetWordTable = SaveDataController.load();

    const wordInformation = tokens.slice(2);

    const cmdFlagsChar = wordInformation.slice(1);
    const flagManager = new TargetWordFrags();
    const addedColumn = new TargetWordColumn(wordInformation[0]);

    addedColumn.flags = flagManager.turnOn(cmdFlagsChar,msg.channel);
    addedColumn.usedWordForJudging = converseWordsFollowingRules(addedColumn.word,flagManager);

    if (_.findIndex(savedTargetWordTable, row => row.usedWordForJudging === addedColumn.usedWordForJudging) !== -1) {
        helperAboutError.throwErrorToDiscord(msg.channel, "既に同じ単語が登録されています。");
        return;
    }

    savedTargetWordTable.push(addedColumn);
    SaveDataController.save(savedTargetWordTable, "targetWordList.json");

    msg.channel.send(embedMessageMaker(addedColumn,msg.client.user?.avatarURL()));
}

function converseWordsFollowingRules(str:string,flagManger:TargetWordFrags){
    let result = str;
    for (const flag of flagManger.definedCmdFlags){
        if (!flag.state) result = fragConverses[`false${flag.cmdForFlag}`](result);
    }
    return result;
}

export function remove(msg:Message, tokens:string[]):void {
    let deletedWord = tokens[2];
    let savedData = SaveDataController.load();
    if (_.findIndex(savedData,ele => ele.word !== deletedWord) === -1) {
        helperAboutError.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
        return;
    }
    SaveDataController.save(savedData.filter(ele => ele.usedWordForJudging !== deletedWord), "targetWordList.json");

}
