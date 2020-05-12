"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var reactToEvents_1 = __importDefault(require("./helper/reactToEvents"));
var standardData_1 = __importDefault(require("./Data/standardData"));
var client = new discord_js_1.Client();
var _loop_1 = function (reacts) {
    client.on(reacts.eventType, function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (reacts.eventType === "message") {
            var msg = args[0];
            if (msg.author.id === standardData_1.default.botID)
                return;
        }
        for (var _a = 0, _b = reacts.processes; _a < _b.length; _a++) {
            var func = _b[_a];
            func.apply(void 0, args);
        }
    });
};
for (var _i = 0, allOfReact_1 = reactToEvents_1.default; _i < allOfReact_1.length; _i++) {
    var reacts = allOfReact_1[_i];
    _loop_1(reacts);
}
client.login(standardData_1.default.tokenId);
