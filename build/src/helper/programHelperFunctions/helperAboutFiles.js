"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../client"));
var discord_js_1 = require("discord.js");
var node_fetch_1 = __importDefault(require("node-fetch"));
var helperAboutFiles = {
    //CH: これバイナリとして保存できない？
    fetchJSONDataFromDiscordDataBase: function (fileName) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var escapedFileName, ch, dataOrURL, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        escapedFileName = escapeFileName(fileName);
                        ch = findFileTextChannel(client_1.default);
                        return [4 /*yield*/, findAttachmentFromChannel(escapedFileName, ch)];
                    case 1:
                        dataOrURL = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.attachmentInMsg.attachment;
                        if (dataOrURL === undefined)
                            return [2 /*return*/, undefined];
                        console.info("load: " + dataOrURL + " (" + typeof dataOrURL + ") as " + escapedFileName);
                        if (!(typeof dataOrURL === "string")) return [3 /*break*/, 4];
                        return [4 /*yield*/, node_fetch_1.default(dataOrURL)];
                    case 2: return [4 /*yield*/, (_c.sent()).json()];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _b = JSON.parse(dataOrURL.toString());
                        _c.label = 5;
                    case 5: return [2 /*return*/, _b];
                }
            });
        });
    },
    saveJSONFromDiscordDataBase: function (fileName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var escapedFileName, savedDataInText, savedDataInBuffer, ch, attachmentAsTarget;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        escapedFileName = escapeFileName(fileName);
                        savedDataInText = JSON.stringify(data);
                        savedDataInBuffer = Buffer.from(savedDataInText);
                        ch = findFileTextChannel(client_1.default);
                        return [4 /*yield*/, findAttachmentFromChannel(escapedFileName, ch)];
                    case 1:
                        attachmentAsTarget = _a.sent();
                        console.info("saved: " + savedDataInText + " as " + escapedFileName);
                        if (attachmentAsTarget !== undefined) {
                            attachmentAsTarget.msg.delete();
                        }
                        ch.send(new discord_js_1.MessageAttachment(savedDataInBuffer, escapedFileName));
                        return [2 /*return*/];
                }
            });
        });
    }
};
function escapeFileName(fileName) {
    return fileName.replace(/[\/\\]/g, "__");
}
function findAttachmentFromChannel(attachmentName, ch) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, _i, _a, msg, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ch.messages.fetch({ limit: 50 })];
                case 1:
                    messages = _b.sent();
                    for (_i = 0, _a = messages.array(); _i < _a.length; _i++) {
                        msg = _a[_i];
                        data = msg.attachments.find(function (attachment) { return attachment.name === attachmentName; });
                        if (data === undefined)
                            continue;
                        return [2 /*return*/, { attachmentInMsg: data, msg: msg }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = helperAboutFiles;
function ChIsTextCh(ch) {
    return ch.type === "text";
}
function findFileTextChannel(client) {
    var _a;
    var textCh = (_a = findFileVault(client)) === null || _a === void 0 ? void 0 : _a.channels.cache.find((function (channel) { return channel.name === "filevault"; }));
    if (textCh === undefined)
        throw new Error("テキストチャンネルを取得できませんでした。");
    if (!ChIsTextCh(textCh))
        throw new Error("取得したチャンネルがテキストチャンネルではありませんでした。");
    return textCh;
}
function findFileVault(client) {
    return client.guilds.resolve("708666232311775263");
}
