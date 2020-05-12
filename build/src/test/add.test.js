"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var standardData_1 = __importDefault(require("../Data/standardData"));
var client = new discord_js_1.Client();
client.on("message", function (msg) {
    if (msg.author.id === standardData_1.default.botID)
        return;
    msg.channel.send({
        embed: {
            color: 0x64e35f,
            title: "ABC",
            description: "Aaaaa -aaaaaa-"
        }
    });
});
client.login(standardData_1.default.tokenId);
