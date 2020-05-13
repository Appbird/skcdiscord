"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCmdChannelIdState = exports.addCmdChannelIdState = void 0;
var helperAboutFiles_1 = __importDefault(require("../helper/programHelperFunctions/helperAboutFiles"));
var client_1 = __importDefault(require("../client"));
var addCmdChannelIdState;
(function (addCmdChannelIdState) {
    addCmdChannelIdState[addCmdChannelIdState["success"] = 0] = "success";
    addCmdChannelIdState[addCmdChannelIdState["alreadyadded"] = 1] = "alreadyadded";
    addCmdChannelIdState[addCmdChannelIdState["failed"] = 2] = "failed";
})(addCmdChannelIdState = exports.addCmdChannelIdState || (exports.addCmdChannelIdState = {}));
var removeCmdChannelIdState;
(function (removeCmdChannelIdState) {
    removeCmdChannelIdState[removeCmdChannelIdState["success"] = 0] = "success";
    removeCmdChannelIdState[removeCmdChannelIdState["notChannelFound"] = 1] = "notChannelFound";
    removeCmdChannelIdState[removeCmdChannelIdState["failed"] = 2] = "failed";
})(removeCmdChannelIdState = exports.removeCmdChannelIdState || (exports.removeCmdChannelIdState = {}));
var StandardDataOwner = /** @class */ (function () {
    function StandardDataOwner() {
        var data = helperAboutFiles_1.default.loadJSONFromlFileInDataBase("standard.json");
        this.botId = data.botId;
        this.cmdChannelId = data.cmdChannelId;
        this.tokenId = data.token;
    }
    StandardDataOwner.prototype.findCmdChannelId = function (channelId) {
        return this.cmdChannelId.findIndex(function (registeredCh) { return registeredCh === channelId; }) !== -1;
    };
    StandardDataOwner.prototype.addCmdChannelId = function (channelId) {
        if (this.findCmdChannelId(channelId))
            return addCmdChannelIdState.alreadyadded;
        this.cmdChannelId.push(channelId);
        this._save();
        return addCmdChannelIdState.success;
    };
    StandardDataOwner.prototype.removeCmdChannelId = function (removedId) {
        var lengthBeforeProcess = this.cmdChannelId.length;
        this.cmdChannelId = this.cmdChannelId.filter(function (element) { return element === removedId; });
        var channelSentMsg = client_1.default.channels.cache.get(this.cmdChannelId[0]);
        if (channelSentMsg === undefined)
            return removeCmdChannelIdState.notChannelFound;
        this._save();
        return removeCmdChannelIdState.success;
    };
    StandardDataOwner.prototype._save = function () {
        helperAboutFiles_1.default.saveJSONDataInDataBase("standard.json", {
            "cmdChannel": this.cmdChannelId,
            "botId": this.botId,
            "tokenId": this.tokenId
        });
    };
    return StandardDataOwner;
}());
var standardData = new StandardDataOwner();
exports.default = standardData;
//# sourceMappingURL=standardData.js.map