"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedMessageMaker = exports.embedMsgState = void 0;
var embedMsgState;
(function (embedMsgState) {
    embedMsgState[embedMsgState["Success"] = 0] = "Success";
    embedMsgState[embedMsgState["Normal"] = 1] = "Normal";
    embedMsgState[embedMsgState["Error"] = 2] = "Error";
})(embedMsgState = exports.embedMsgState || (exports.embedMsgState = {}));
function embedMessageMaker(title, authorName, description, fields, timestamp, state) {
    return {
        embed: {
            color: returnColor(state),
            title: "" + returnIcon(state) + title,
            author: {
                name: authorName
            },
            description: description,
            fields: fields,
            timestamp: timestamp
        }
    };
}
exports.embedMessageMaker = embedMessageMaker;
function returnColor(state) {
    switch (state) {
        case embedMsgState.Success: return 0x64e35f;
        case embedMsgState.Normal: return 0x4297ff;
        case embedMsgState.Error: return 0xff4f42;
    }
}
function returnIcon(state) {
    switch (state) {
        case embedMsgState.Success: return ":white_check_mark:";
        case embedMsgState.Normal: return ":information_source:";
        case embedMsgState.Error: return ":exclamation:";
    }
}
//# sourceMappingURL=embedMessageMaker.js.map