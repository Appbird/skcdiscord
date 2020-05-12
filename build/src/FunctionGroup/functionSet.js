"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ready_1 = __importDefault(require("./Ready/Ready"));
var BallonBurier_1 = __importDefault(require("./BallonBurier/BallonBurier"));
var functionSet = [
    Ready_1.default,
    BallonBurier_1.default
];
exports.default = functionSet;
