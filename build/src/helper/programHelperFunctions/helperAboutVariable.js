"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path = "./envVariables.json";
var EnvData = (fs_1.existsSync(path)) ? JSON.parse(fs_1.readFileSync(path, "utf8")) : process.env;
function getEnvVariable(name) {
    if (!EnvData.hasOwnProperty(name))
        throw new Error("\u74B0\u5883\u5909\u6570" + name + "\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002");
    return EnvData[name];
}
exports.default = getEnvVariable;
