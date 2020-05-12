"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragConverses = void 0;
exports.fragConverses = {
    "false-es": function (str) { return str.replace(/\s+/g, ""); },
    "false-edbhk": function (str) { return str.replace(/[\u30A1-\u30FA]/g, function (ch) { return String.fromCharCode(ch.charCodeAt(0) - 0x60); }); },
    "false-edabls": function (str) { return str.toLowerCase(); }
};
