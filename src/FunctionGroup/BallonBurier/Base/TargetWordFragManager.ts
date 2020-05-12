import { cmdFlagManager } from "../../../helper/cmdFrags";
export default class TargetWordFragManager extends cmdFlagManager {
    definedCmdFlags = [
        {
            flagTitle: "emphasizeSpace",
            flagOnDescription:"判別するにあたってメッセージのスペースの有無を重視する。",
            flagOffDescription:"判別するにあたってメッセージのスペースの有無を無視する。",
            cmdForFlag: "-es", state: false
        },
        {
            flagTitle: "emphasizeDistinctionBetweenHiraKata",
            flagOnDescription:"ひらがなカタカナの区別を重視する。",
            flagOffDescription:"ひらがなカタカナの区別を無視する。",
            cmdForFlag: "-edbhk", state: false
        },
        {
            flagTitle: "emphasizeDistinctionAlpBetweenLargeSmall",
            flagOnDescription:"アルファベットの大小の区別を重視する。",
            flagOffDescription:"アルファベットの大小の区別を無視する。",
            cmdForFlag: "-edabls", state: false
        }
    ];
}

/*
    flagOnDescription:"",
    flagOffDescription:"", 
*/