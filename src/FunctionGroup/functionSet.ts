"use strict";

import IFunctionBase from "../Base/IFunctionBase";
import Ready from "./Ready/Ready";
import BallonBurier from "./BallonBurier/BallonBurier";
import CmdChannelManager from "./CmdChannelManager/CmdChannelManager";

const functionSet: IFunctionBase[] = [
    Ready,
    BallonBurier,
    CmdChannelManager
]
export default functionSet;