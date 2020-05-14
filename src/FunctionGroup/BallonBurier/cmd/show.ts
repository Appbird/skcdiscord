import { Message } from "discord.js";
import SaveDataController from "../Base/SaveDataController";
import { embedMessageMaker, embedMsgState } from "../../../helper/embedMessageMaker";
import BallonBurier from "../BallonBurier";
export default function show(msg: Message) {
    const listOfFlags = SaveDataController.load().map(column => {
        const flagEnumerated = column.flags.join(" , ");
        return {
            name: `__**${column.word}**__`,
            value: (flagEnumerated === "") ? "no flag" : flagEnumerated,
            inline: false
        };
    });
    msg.channel.send(embedMessageMaker("対象リストとそのワードに関するフラグ一覧", BallonBurier.realFuncName, "", listOfFlags, new Date(), embedMsgState.Normal));
}
