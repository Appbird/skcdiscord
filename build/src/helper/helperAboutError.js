"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helperAboutError = {
    throwErrorToDiscord: function (targetChannel, content) {
        targetChannel.send("ERROR > " + content);
    }
};
exports.default = helperAboutError;
