import { cmdFlagManager } from "../../../helper/cmdFrags";
export default class TargetWordFragManager extends cmdFlagManager {
    definedCmdFlags = [
        {
            flagTitle: "emphasizeSpace",
            cmdForFlag: "-es", state: false
        },
        {
            flagTitle: "emphasizeUnrelatedInscription",
            cmdForFlag: "-eui", state: false
        },
        {
            flagTitle: "emphasizeProlongedSoundMark",
            cmdForFlag: "-epsm", state: false
        },
        {
            flagTitle: "emphasizeDistinctionBetweenHiraKata",
            cmdForFlag: "-edbhk", state: false
        },
        {
            flagTitle: "emphasizeDistinctionAlpBetweenLargeSmall",
            cmdForFlag: "-edabls", state: false
        }
    ];
}
