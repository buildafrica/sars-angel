"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("./controllers"));
var router = express_1.default.Router();
router.post('/send', controllers_1.default.createWorker);
router.get('/:id', controllers_1.default.show);
exports.default = router;
