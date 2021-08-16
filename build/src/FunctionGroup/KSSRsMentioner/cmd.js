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
var helperAboutError_1 = __importDefault(require("../../helper/programHelperFunctions/helperAboutError"));
var helperAboutVariable_1 = __importDefault(require("../../helper/programHelperFunctions/helperAboutVariable"));
var APICaller_1 = require("./APICaller");
function kssrs_rolegiver(msg) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var arg, tokenArray, gamemode_1, gamemodeRole, apiCaller, gameSystemCollection, _b, requestedGameSystemName_1, requestedGameModeName_1, requestedGameSystem, requestedGameMode, newRole, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    arg = msg.content.split(" ").slice(2).join(" ");
                    tokenArray = arg.split("/");
                    gamemode_1 = tokenArray[0] + "/" + tokenArray[1];
                    gamemodeRole = (_a = msg.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.find(function (role) { return role.name === "" + gamemode_1; });
                    if (gamemodeRole !== undefined) {
                        if (msg.member === null) {
                            helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The author of this message(" + msg.content + ") is not found. (From " + msg.author.username + ")");
                            return [2 /*return*/];
                        }
                        giveRole(msg.channel, gamemodeRole, msg.member);
                        return [2 /*return*/];
                    }
                    apiCaller = new APICaller_1.APIAdministrator();
                    return [4 /*yield*/, apiCaller.access("list_gameSystems", {})];
                case 1:
                    gameSystemCollection = (_c.sent()).result;
                    _b = [tokenArray[0], tokenArray[1]], requestedGameSystemName_1 = _b[0], requestedGameModeName_1 = _b[1];
                    requestedGameSystem = gameSystemCollection.find(function (gameSystem) { return gameSystem.English === requestedGameSystemName_1; });
                    if (requestedGameSystem === undefined) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The title **" + requestedGameSystemName_1 + "** is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, apiCaller.access("list_gameModes", { gameSystemEnv: { gameSystemID: requestedGameSystem.id } })];
                case 2:
                    requestedGameMode = (_c.sent()).result.find(function (tgamemode) { return tgamemode.English === requestedGameModeName_1; });
                    if (requestedGameMode === undefined) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The mode **" + requestedGameModeName_1 + "** is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    if (msg.guild === null || msg.member === null) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The guild or member is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, msg.guild.roles.create({ data: { name: gamemode_1, color: "GREEN", mentionable: true } })];
                case 3:
                    newRole = _c.sent();
                    giveRole(msg.channel, newRole, msg.member);
                    return [4 /*yield*/, apiCaller.access("addDiscordRoleID", { gameSystemEnv: { gameSystemID: requestedGameSystem.id, gameModeID: requestedGameMode.id }, id: newRole.id, token: helperAboutVariable_1.default("KSSRs_TOKEN") })];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _c.sent();
                    helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", err_1.message + (" (From " + msg.author.username + ")"));
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.kssrs_rolegiver = kssrs_rolegiver;
function kssrs_roledepriver(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var arg, tokenArray, roleName_1, role, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    arg = msg.content.split(" ").slice(2).join(" ");
                    tokenArray = arg.split("/");
                    roleName_1 = tokenArray[0] + "/" + tokenArray[1];
                    if (msg.member === null) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The messsage from **" + msg.author.username + "** of member is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    role = msg.member.roles.cache.find(function (role) { return role.name === roleName_1; });
                    if (role === undefined) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "Role **" + roleName_1 + "** is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, msg.member.roles.remove(role)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", err_2.message + ("(From " + msg.author.username + ")"));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.kssrs_roledepriver = kssrs_roledepriver;
function giveKSSRsGameTitleList(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var apiCaller, gameSystemCollection, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiCaller = new APICaller_1.APIAdministrator();
                    return [4 /*yield*/, apiCaller.access("list_gameSystems", {})];
                case 1:
                    gameSystemCollection = (_a.sent()).result;
                    msg.channel.send(gameSystemCollection.map(function (gamesystem) { return "\u30FB " + gamesystem.Japanese + " / " + gamesystem.English; }).join("\n"));
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", err_3.message + ("(From " + msg.author.username + ")"));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.giveKSSRsGameTitleList = giveKSSRsGameTitleList;
function giveKSSRsGameModeList(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var arg, tokenArray, apiCaller, gameSystemCollection, requestedGameSystemName_2, requestedGameSystem, gameModeCollection, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    arg = msg.content.split(" ").slice(2).join(" ");
                    tokenArray = arg.split("/");
                    apiCaller = new APICaller_1.APIAdministrator();
                    return [4 /*yield*/, apiCaller.access("list_gameSystems", {})];
                case 1:
                    gameSystemCollection = (_a.sent()).result;
                    requestedGameSystemName_2 = arg;
                    requestedGameSystem = gameSystemCollection.find(function (gameSystem) { return gameSystem.English === requestedGameSystemName_2; });
                    if (requestedGameSystem === undefined) {
                        helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", "The title " + requestedGameSystemName_2 + " is not found. (From " + msg.author.username + ")");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, apiCaller.access("list_gameModes", { gameSystemEnv: { gameSystemID: requestedGameSystem.id } })];
                case 2:
                    gameModeCollection = (_a.sent()).result;
                    msg.channel.send(gameModeCollection.map(function (gameMode) { return "\u30FB " + gameMode.Japanese + " / " + gameMode.English; }).join("\n"));
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    helperAboutError_1.default.throwErrorToDiscord(msg.channel, "An Error has been Occured.", err_4.message + ("(From " + msg.author.username + ")"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.giveKSSRsGameModeList = giveKSSRsGameModeList;
function giveRole(channel, role, member) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, member.roles.add(role)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, channel.send("Role **" + role.name + "** is given to " + member.displayName + ".")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
