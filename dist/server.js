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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var BullBoard = __importStar(require("bull-board"));
var routes_1 = __importDefault(require("./domains/messenger/routes"));
var cors_1 = __importDefault(require("cors"));
var server = express_1.default();
/* Enable cors:: should limit origin once stabls */
server.use(cors_1.default({
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
    origin: '*'
}));
/* --- JSON Parser for incoming requests --- */
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
/* For the UI and API Routes*/
server.use('/bull-board-ui', BullBoard.UI);
server.use('/messenger', routes_1.default);
server.use('/_healthcheck', function (_req, res) {
    res.status(200).json({ uptime: process.uptime() });
});
exports.default = server;
