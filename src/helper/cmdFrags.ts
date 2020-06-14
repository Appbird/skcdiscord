import helperAboutError from "./programHelperFunctions/helperAboutError";
import { Message, TextChannel, DMChannel, NewsChannel } from "discord.js";


export interface ICmdFlag{
    /** @property フラグ名 */
    flagTitle : string;
    /** @property フラグが立つ時の説明 */
    flagOnDescription: string;
    /** @property フラグが立たない時の説明 */
    flagOffDescription: string;
    /** @property このフラグを操作するために、コマンドでフラグとして入力すべき文字列 */
    cmdForFlag : string;
    /**@property 状態 */
    state: boolean;
}

export class cmdFlagManager{
    /** @property コマンドに用意された存在するフラグの一覧。*/
    public definedCmdFlags:ICmdFlag[] = [];
    /**
     * 大文字小文字関係なくフラグは反応します。
     * @param cmdFlags コマンドとして入力された、フラグを表す文字列配列
     * @param channel エラーが起こった際にメッセージを送るチャンネル
     * @return 反応した全てのフラグ
     */
    public turnOn(cmdFlagsChar:string[],channel:TextChannel|DMChannel|NewsChannel):string[]{
        let result:string[] = [];
        for(const cmdFlag of cmdFlagsChar){
            let judgedCmdFlag = cmdFlag.toLowerCase();
            if (judgedCmdFlag[0] !== "-"){
                helperAboutError.throwErrorToDiscord(channel,
                    `このコマンドはこれほど多くの引数は取りません。`);
                continue;
            }
            let definedCmdFlagIndex = this.definedCmdFlags.findIndex(element => element.cmdForFlag === judgedCmdFlag);
            if (definedCmdFlagIndex === -1){
                helperAboutError.throwErrorToDiscord(channel,
                    `フラグ"${cmdFlag}"は存在しません。このフラグを無視して処理を続行します。`);
                continue;
            }
            this.definedCmdFlags[definedCmdFlagIndex].state = !this.definedCmdFlags[definedCmdFlagIndex].state;
            result.push(cmdFlag);
        }
        return result;
    }
}
