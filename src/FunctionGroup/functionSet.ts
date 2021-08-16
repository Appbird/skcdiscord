"use strict";

import IFunctionBase from "../Base/IFunctionBase";
import Ready from "./Ready/Ready";
import { KSSRsNotifer } from "./KSSRsMentioner/KSSRsNotifier";
import CmdChannelManager from "./CmdChannelManager/CmdChannelManager";

const functionSet: IFunctionBase[] = [
    Ready,
    /*BallonBurier,*/
    CmdChannelManager,
    KSSRsNotifer
]
export default functionSet;