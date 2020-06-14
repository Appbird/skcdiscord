"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var cmdExecutor_1 = __importDefault(require("./cmdExecutor"));
var standardData_1 = require("../Data/standardData");
var allOfReact = [
    {
        eventType: "message",
        processes: [function (msg) {
                standardData_1.StandardDataManager.getCmdChannelId().then(function (cmdChannelId) {
                    if (cmdChannelId.findIndex(function (id) { return id === msg.channel.id; }) !== -1 && msg.content[0] === ">")
                        cmdExecutor_1.default(msg);
                });
            }
        ]
    }
];
recollectReact(allOfReact);
function recollectReact(reactTable) {
    for (var _i = 0, functionSet_2 = functionSet_1.default; _i < functionSet_2.length; _i++) {
        var func = functionSet_2[_i];
        for (var _a = 0, _b = func.reacts; _a < _b.length; _a++) {
            var rt = _b[_a];
            classifyEventReact(reactTable, rt);
        }
    }
    return reactTable;
}
/***
 * 副作用あり。第一引数の変数を変更する。
***/
function classifyEventReact(reactTable, react) {
    var addedColumnIndex = reactTable.findIndex(function (element) { return element.eventType === react.eventType; });
    if (addedColumnIndex === -1)
        addedColumnIndex = reactTable.push({ eventType: react.eventType, processes: [] }) - 1;
    reactTable[addedColumnIndex].processes.push(react.process);
}
exports.default = allOfReact;
