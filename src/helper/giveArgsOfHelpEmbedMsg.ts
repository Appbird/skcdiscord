import functionSet from "../FunctionGroup/functionSet";
import { IEmbedMessageField, embedMsgState } from "./embedMessageMaker";
export function giveArgsOfHelpEmbedMsgAboutFunction(): [string, string, string, IEmbedMessageField[], Date, embedMsgState] {
    return [`機能群`, `Helper`, "",
        functionSet.map(ele => {
            return {
                name: `${ele.functionName}(${ele.realFuncName})`,
                value: ele.description,
                inline: false
            };
        }),
        new Date(), embedMsgState.Normal];
}
export function giveArgsOfHelpEmbedMsgAboutCmd(functionIndex: number): [string, string, string, IEmbedMessageField[], Date, embedMsgState] {
    const givenField = functionSet[functionIndex].
        commands.map(ele => {
            return {
                name: `__**【${ele.commandTitle}】**__`,
                value: `\`\`\`>${functionSet[functionIndex].functionName} ${ele.commandTitle} ${ele.argsForDescription.join(" ")}\`\`\`
                ${(ele.allowedFlags !== undefined) ?
                                "**[フラグ]**\n" + ele.allowedFlags.map(flag => "__" + flag.cmdForFlag +"("+flag.flagTitle+")" + "__\nOnのとき、" + flag.flagOnDescription).join("\n")+"\n" : ""
                            }**[説明]**\n${ele.description}`,
                inline: false
            };
        });
    return [`${(functionSet[functionIndex].realFuncName)}のコマンド`, `Helper`, "", givenField, new Date(), embedMsgState.Normal];
}
