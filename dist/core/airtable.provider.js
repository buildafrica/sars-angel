"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyRecord = exports.createManyRecord = exports.createOneRecord = exports.getCollections = exports.getSimpleCollection = void 0;
var airtable_1 = __importDefault(require("airtable"));
var logger_1 = __importDefault(require("./logger"));
var secrets_1 = __importDefault(require("./secrets"));
exports.getSimpleCollection = function (options) {
    var baseName = options.baseName, baseView = options.baseView;
    var base = new airtable_1.default({ apiKey: secrets_1.default.AIRTABLE_KEY }).base(secrets_1.default.AIRTABLE_BASE);
    return base(baseName).select({
        view: baseView
    });
};
exports.getCollections = function (options) {
    var baseName = options.baseName, limit = options.limit, baseView = options.baseView;
    var base = new airtable_1.default({ apiKey: secrets_1.default.AIRTABLE_KEY }).base(secrets_1.default.AIRTABLE_BASE);
    return base(baseName).select({
        maxRecords: limit,
        view: baseView
    });
};
exports.createOneRecord = function (baseName, payload) {
    var base = new airtable_1.default({ apiKey: secrets_1.default.AIRTABLE_KEY }).base(secrets_1.default.AIRTABLE_BASE);
    logger_1.default.info("creating new record in " + baseName + " for " + payload.channel);
    return base(baseName).create([
        {
            fields: __assign({}, payload)
        }
    ]);
};
exports.createManyRecord = function (baseName, payload) {
    var base = new airtable_1.default({ apiKey: secrets_1.default.AIRTABLE_KEY }).base(secrets_1.default.AIRTABLE_BASE);
    logger_1.default.info("creating new record in " + baseName);
    return base(baseName).create([__spreadArrays(payload)]);
};
exports.notifyRecord = function (message, recipientName, status, channel) { return __awaiter(void 0, void 0, void 0, function () {
    var recordCreatedOption;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_1.default.debug("airtable.provider func: notifyRecord for " + status + " status");
                recordCreatedOption = {
                    Recipient: recipientName,
                    Message: message,
                    Status: status,
                    Time: new Date().toString(),
                    Channel: channel
                };
                return [4 /*yield*/, exports.createOneRecord('Delivered_Messages', recordCreatedOption)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
