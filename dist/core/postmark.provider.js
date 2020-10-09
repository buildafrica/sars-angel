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
var postmark = __importStar(require("postmark"));
var secrets_1 = __importDefault(require("./secrets"));
var body_1 = __importDefault(require("../entities/body"));
var postmarkEmailProvider = function (recipientEmail, recipientName) {
    /* Initialize Keys */
    var serverToken = secrets_1.default.POSTMARK_KEY || '';
    var client = new postmark.ServerClient(serverToken);
    /* Send Email using Postmark Templates */
    return client.sendEmailWithTemplate({
        From: secrets_1.default.POSTMARK_SENDER,
        To: recipientEmail,
        TemplateAlias: 'comment-notification',
        TemplateModel: {
            product_url: 'https://statehouse.gov.ng/',
            product_name: '#EndSARSNow #ReformPoliceNG',
            body: "Dear " + recipientName + ", " + body_1.default.email,
            attachment_details: [
                {
                    attachment_url: 'https://www.safewaysagency.com/wp-content/uploads/2020/06/Nigeria-640x640-1.jpg',
                    attachment_name: '#Nigeria',
                    attachment_size: 'small',
                    attachment_type: 'jpg'
                }
            ],
            commenter_name: 'State House of Assembly',
            timestamp: Date.now(),
            action_url: 'https://statehouse.gov.ng/',
            notifications_url: 'https://statehouse.gov.ng/',
            company_name: 'Senate Committee',
            company_address: 'Federal Government of Nigeria'
        }
    });
};
exports.default = postmarkEmailProvider;
