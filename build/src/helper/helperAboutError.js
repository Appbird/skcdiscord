"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var embedMessageMaker_1 = require("./embedMessageMaker");
var helperAboutError = {
    throwErrorToDiscord: function (targetChannel, content, description, fields) {
        targetChannel.send(embedMessageMaker_1.embedMessageMaker(":exclamation: " + content, "ErrorRepoter", (description !== undefined) ? description : "", (fields !== undefined) ? fields : [], new Date(), embedMessageMaker_1.embedMsgState.Error));
    }
};
exports.default = helperAboutError;
