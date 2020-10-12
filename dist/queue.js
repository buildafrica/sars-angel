"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConsumer = exports.createWorker = void 0;
var bull_1 = __importDefault(require("bull"));
var ioredis_1 = __importDefault(require("ioredis"));
var BullBoard = __importStar(require("bull-board"));
var secrets_1 = __importDefault(require("./core/secrets"));
var tasks_1 = require("./_helpers/tasks");
/* Import Producers and Consumers from Messaging Channels */
var email_1 = require("./channels/email");
var sms_1 = require("./channels/sms");
var voice_1 = require("./channels/voice");
var MAX_CONCURRENCY = 3;
var SMS = 'SMS';
var VOICE = 'voice';
var EMAIL = 'email';
// Initialize the Redis Connection Options
var redisConnectionOptions = {
    port: secrets_1.default.REDIS_PORT,
    host: secrets_1.default.REDIS_HOST,
    password: secrets_1.default.REDIS_PASSWORD
};
var client = new ioredis_1.default(redisConnectionOptions);
var subscriber = new ioredis_1.default(redisConnectionOptions);
/* --------------------------------------------------------------------------------
 *
 * Re-use connection in ioredis
 * https://github.com/OptimalBits/bull/blob/master/PATTERNS.md#reusing-redis-connections
 *
 ---------------------------------------------------------------------------------*/
var queueOptions = {
    createClient: function (__type__) {
        switch (__type__) {
            case 'client':
                return client;
            case 'subscriber':
                return subscriber;
            default:
                return new ioredis_1.default(redisConnectionOptions);
        }
    }
};
var messageQueue = new bull_1.default('messenger', queueOptions);
/* Notify the Bull Board UI about the Queues within the app*/
BullBoard.setQueues([messageQueue]);
function queue() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    /* Instantiate all Producers here */
                    tasks_1._createRepeatableTask(messageQueue)(EMAIL, email_1.emailProducer());
                    _a = tasks_1._createRepeatableTask(messageQueue);
                    _b = [SMS];
                    return [4 /*yield*/, sms_1.SMSProducer()];
                case 1:
                    _a.apply(void 0, _b.concat([_e.sent()]));
                    _c = tasks_1._createRepeatableTask(messageQueue);
                    _d = [VOICE];
                    return [4 /*yield*/, voice_1.voiceProducer()];
                case 2:
                    _c.apply(void 0, _d.concat([_e.sent()]));
                    // Call Consumers here
                    messageQueue.process(EMAIL, function (job, done) { return email_1.emailConsumer(job, done); });
                    messageQueue.process(SMS, MAX_CONCURRENCY, function (job, done) { return sms_1.SMSConsumer(job, done); });
                    messageQueue.process(VOICE, function (job, done) { return voice_1.voiceConsumer(job, done); });
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = queue;
/* We will come to this later:: Function to immediately create a producer from API*/
exports.createWorker = function () { return null; };
/* Function that invokes a job's process and consumes immediately from API*/
exports.createConsumer = function () { return null; };
