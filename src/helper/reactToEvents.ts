"use strict";
import functionSet from "../FunctionGroup/functionSet";
import { ClientEvents, Message} from "discord.js";
import _ from "lodash";
import executeCmd from "./cmdExecutor";
import IReactBase from "../Base/IReactBase";
import {StandardDataManager} from "../Data/standardData"
 

    let allOfReact:IReactProcessBox<keyof ClientEvents>[] = [
        {
            eventType:"message",
            processes:
            [(msg:Message) =>
                {
                    StandardDataManager.getCmdChannelId().then(
                        (cmdChannelId) => {
                    if (cmdChannelId.findIndex(id => id === msg.channel.id ) !== -1 && msg.content[0]===">") executeCmd(msg);
                })
                }
            ]
            /* コマンドは"message"Reactとして設定する。
            ちなみに、TypeScriptが双変性を禁ずる理由はここにある。
            このとき、配列からこの要素にアクセスしていても、
            その要素は静的解析からは上位型であるIReactProcessBox<keyof ClientEvents>としか認識されず、
            IReactProcessBox<"message">とは決してならない。
            ゆえに、他の上位型IReactProcessBox<keyof ClientEvents>の部分型としての操作を行ったとして
            も静的解析には一切怒られない。
            */
        }
    ];
    recollectReact(allOfReact);

interface IReactProcessBox<K extends keyof ClientEvents>{
    eventType:K;
    processes:((...args: ClientEvents[K])=>void)[];
}

function recollectReact(reactTable:IReactProcessBox<keyof ClientEvents>[]){

    for (const func of functionSet){
        for (const rt of func.reacts){
            classifyEventReact(reactTable,rt);
        }
    }
    return reactTable;
}

/***
 * 副作用あり。第一引数の変数を変更する。
***/
function classifyEventReact<K extends keyof ClientEvents>(reactTable: IReactProcessBox<K>[], react: IReactBase<K>) {
    let addedColumnIndex = _.findIndex(reactTable, element => element.eventType === react.eventType);
    if (addedColumnIndex === -1) addedColumnIndex = reactTable.push({ eventType: react.eventType, processes: [] }) - 1;
    reactTable[addedColumnIndex].processes.push(react.process);
}

export default allOfReact;