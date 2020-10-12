"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConsumer = void 0;
var postmark_provider_1 = __importDefault(require("../../core/postmark.provider"));
function emailConsumer(job, done) {
    var data = job.data;
    console.log('EMAIL CONSUMER JOB STARTED ---->', job);
    // Call the Email provider
    data.forEach(function (item) {
        var email = item.email || '';
        var name = item.name || '';
        postmark_provider_1.default(email, name);
    });
    done();
}
exports.emailConsumer = emailConsumer;
