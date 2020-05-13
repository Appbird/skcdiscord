import { Message} from "discord.js";
import _ from "lodash";

import helperAboutError from "../../helper/programHelperFunctions/helperAboutError";
import { TargetWordColumn } from "./Base/TargetWordColumn";
import SaveDataController from "./SaveDataController";
import { embedMessageMaker, embedMsgState } from "../../helper/embedMessageMaker";
import TargetWordFrags from "./Base/TargetWordFragManager";
import { fragConverses } from "./Base/FragConversion";
import BallonBurier from "./BallonBurier";



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
    SaveDataController.save(savedTargetWordTable);

    let listOfFlags = flagManager.definedCmdFlags.map(ele=> { return {
        name: (ele.state) ? `${ele.flagTitle}`:`~~${ele.flagTitle}~~`,
        value: (ele.state) ? ele.flagOnDescription:ele.flagOffDescription,
        inline: false
    }});

    msg.channel.send(embedMessageMaker(
        `:white_check_mark: ワード「${addedColumn.word}」がリストに追加されました。`,
        BallonBurier.realFuncName,
        "以下の属性が適用されています。",
        listOfFlags,
        addedColumn.registeredTimeStamp,
        embedMsgState.Success
    ));
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
    
    if (_.findIndex(savedData,ele => ele.word !== deletedWord) === -1 || deletedWord === "" || deletedWord === undefined) {
        helperAboutError.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
        return;
    }
    msg.channel.send(embedMessageMaker(
        `:white_check_mark: ワード${deletedWord}をリストから除外しました。`,
        BallonBurier.realFuncName,
        "",
        [],
        new Date(),
        embedMsgState.Normal
    ));
    SaveDataController.save(savedData.filter(ele => ele.usedWordForJudging !== deletedWord));

}
export function show(msg:Message){
    const listOfFlags = SaveDataController.load().map(column=> { 
        const flagEnumerated = column.flags.join(" , ")
        return {
        name: `__**${column.word}**__`,
        value: (flagEnumerated === "") ?  "no flag":flagEnumerated,
        inline: false
    }});
    msg.channel.send(embedMessageMaker(
        ":information_source: 対象リストとそのワードに関するフラグ一覧",
        BallonBurier.realFuncName,
        "",
        listOfFlags,
        new Date(),
        embedMsgState.Normal
    ));
}