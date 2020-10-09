"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailProducer = void 0;
var senators_entities_1 = __importDefault(require("../../entities/senators.entities"));
/* Producer function returns an object of intended recipients for a channel type */
exports.emailProducer = function () {
    return senators_entities_1.default;
};
