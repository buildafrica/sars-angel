"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._createCronTask = exports._createRepeatableTask = void 0;
var secrets_1 = __importDefault(require("../core/secrets"));
exports._createRepeatableTask = function (queue) { return function (name, data) {
    queue.add(name, data, {
        repeat: {
            every: secrets_1.default.SEND_INTERVAL,
            limit: 10000
        }
    });
}; };
exports._createCronTask = function (queue, name, data) {
    queue.add(name, data, {
        repeat: { cron: '* 2 * * *' }
    });
};
