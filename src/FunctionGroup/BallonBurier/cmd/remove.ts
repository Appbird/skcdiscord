import SaveDataController from "../Base/SaveDataController";
import { Message } from "discord.js";
import helperAboutError from "../../../helper/programHelperFunctions/helperAboutError";
import { embedMessageMaker, embedMsgState } from "../../../helper/embedMessageMaker";
import BallonBurier from "../BallonBurier";

export function remove(msg:Message, tokens:string[]):void {
    let deletedWord = tokens[2];
    SaveDataController.load().then(
        savedData => {

    let indexWhereFound =savedData.findIndex(ele => ele.word === deletedWord)
    if (indexWhereFound === -1 || deletedWord === "" || deletedWord === undefined) {
        helperAboutError.throwErrorToDiscord(msg.channel, "一致する単語が見つかりません。");
        return;
    }
    msg.channel.send(embedMessageMaker(
        `ワード${deletedWord}をリストから除外しました。`,
        BallonBurier.realFuncName,
        "",
        [],
        new Date(),
        embedMsgState.Normal
    ));
    SaveDataController.save(savedData.filter((ele,index) => index !== indexWhereFound));

    });
}