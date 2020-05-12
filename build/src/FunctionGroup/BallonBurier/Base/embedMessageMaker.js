"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function embedMessageMaker(addedRow, avatarURL) {
    var listOfFlags = addedRow.usedWordForJudging;
    return {
        embed: {
            author: {
                icon_url: avatarURL,
                name: "Ballon Burier"
            },
            title: "\u30EF\u30FC\u30C9" + addedRow.word + "\u3092\u767B\u9332\u3057\u307E\u3057\u305F\u3002",
            description: "\n            \u4EE5\u4E0B\u306E\u3088\u3046\u306A\u5C5E\u6027\u3067\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002\n            " + listOfFlags + "\n            ",
            color: 0x64e35f,
            timestamp: addedRow.registeredTimeStamp,
        }
    };
}
exports.default = embedMessageMaker;
