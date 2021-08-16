import ICommandBase from "../../Base/ICommandBase";
import IFunctionBase from "../../Base/IFunctionBase";
import { giveKSSRsGameModeList, giveKSSRsGameTitleList, kssrs_roledepriver, kssrs_rolegiver } from "./cmd";

const cmd:ICommandBase[] = [
    {
        commandTitle: "On",
        numberOfTokenRequired: 2,
        description: "Give you a Role of @\`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`. If you receive that role, you can notice when the new post is appeared in \`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\` by mentioned.",
        argsForDescription: ["[GameTitle(in English): A]","[GameMode(in English): B]"],
        process:kssrs_rolegiver
    },{
        commandTitle: "Off",
        numberOfTokenRequired: 2,
        description: "Deprive you of a Role of @\`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`. If you do this, you can eliminate notifications of when the new post is appeared in\`[GameTitle(in English): A]\`\/\`[GameMode(in English): B]\`.",
        argsForDescription: ["[GameTitle(in English): A]","[GameMode(in English): B]"],
        process:kssrs_roledepriver
    },{
        commandTitle: "GetGameTitleList",
        numberOfTokenRequired: 0,
        description: "Get a List of game titles covered in KSSRs.",
        argsForDescription: [],
        process:giveKSSRsGameTitleList
    },{
        commandTitle: "GetGameModeList",
        numberOfTokenRequired: 1,
        description: "Get a List of game modes covered in KSSRs(\`[GameTitle(in English): A]\`).",
        argsForDescription: ["[GameTitle(in English): A]"],
        process:giveKSSRsGameModeList
    }
]
export const KSSRsNotifer:IFunctionBase = {
    commands:cmd,
    reacts:[],
    functionName:"KSSRs",
    realFuncName:"KSSRsNotifer",
    description:"KSSRsに関する機能を集めました。"
}