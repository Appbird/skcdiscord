"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ready_1 = __importDefault(require("./Ready/Ready"));
var KSSRsNotifier_1 = require("./KSSRsMentioner/KSSRsNotifier");
var CmdChannelManager_1 = __importDefault(require("./CmdChannelManager/CmdChannelManager"));
var functionSet = [
    Ready_1.default,
    /*BallonBurier,*/
    CmdChannelManager_1.default,
    KSSRsNotifier_1.KSSRsNotifer
];
exports.default = functionSet;
