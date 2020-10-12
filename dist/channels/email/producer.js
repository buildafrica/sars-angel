"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailProducer = void 0;
var logger_1 = __importDefault(require("../../core/logger"));
var dev_entities_1 = __importDefault(require("../../entities/dev.entities"));
/* Producer function returns an object of intended recipients for a channel type */
exports.emailProducer = function () {
    logger_1.default.info('email recipients produced');
    return dev_entities_1.default;
};
