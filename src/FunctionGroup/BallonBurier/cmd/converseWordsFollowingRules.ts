import TargetWordFrags from "../Base/TargetWordFragManager";
import { fragConverses } from "../Base/FragConversion";

export function converseWordsFollowingRules(str: string, flagManger: TargetWordFrags) {
    let result = str;
    for (const flag of flagManger.definedCmdFlags) {
        if (!flag.state)
            result = fragConverses[`false${flag.cmdForFlag}`](result);
    }
    return result;
}
