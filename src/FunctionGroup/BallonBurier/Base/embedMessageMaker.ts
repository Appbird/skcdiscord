import { TargetWordColumn } from "./TargetWordColumn";
import { Client } from "discord.js";

export default function embedMessageMaker(addedRow:TargetWordColumn,avatarURL?:string|null|boolean){
    const listOfFlags = addedRow.usedWordForJudging;
    return {
        embed:{
            author:{
                icon_url:avatarURL,
                name: "Ballon Burier"
            },
            title: `ワード${addedRow.word}を登録しました。`,
            description: `
            以下のような属性で登録されています。
            ${listOfFlags}
            `,
            color: 0x64e35f,
            timestamp: addedRow.registeredTimeStamp,
        }
    }
}