"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cmd_1 = require("../FunctionGroup/BallonBurier/cmd");
var discord_js_1 = require("discord.js");
var cmdExecutor_1 = require("../helper/cmdExecutor");
var standardData_1 = __importDefault(require("../Data/standardData"));
var logger_1 = __importDefault(require("./logger"));
var client = new discord_js_1.Client();
client.on("message", function (msg) {
    if (msg.author.id === standardData_1.default.botID)
        return;
    logger_1.default.debug("start");
    var tokens = cmdExecutor_1.devideIntoTokens(msg.content);
    cmd_1.add(msg, tokens);
});
client.login(standardData_1.default.tokenId);
