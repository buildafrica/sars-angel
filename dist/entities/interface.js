"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = exports.CHANNEL = void 0;
var CHANNEL;
(function (CHANNEL) {
    CHANNEL["VOICE"] = "voice";
    CHANNEL["SMS"] = "sms";
    CHANNEL["WHATSAPP"] = "whatsapp";
    CHANNEL["EMAIL"] = "email";
    CHANNEL["TWITTER"] = "twitter";
})(CHANNEL = exports.CHANNEL || (exports.CHANNEL = {}));
var STATUS;
(function (STATUS) {
    STATUS["FAILED"] = "failed";
    STATUS["DELIVERED"] = "delivered";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
