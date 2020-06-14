"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var functionSet_1 = __importDefault(require("../FunctionGroup/functionSet"));
var lodash_1 = __importDefault(require("lodash"));
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
    var addedColumnIndex = lodash_1.default.findIndex(reactTable, function (element) { return element.eventType === react.eventType; });
    if (addedColumnIndex === -1)
        addedColumnIndex = reactTable.push({ eventType: react.eventType, processes: [] }) - 1;
    reactTable[addedColumnIndex].processes.push(react.process);
}
exports.default = allOfReact;
