"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNode = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports.getRandomNode = function (arr) {
    return lodash_1.default.sample(arr);
};
