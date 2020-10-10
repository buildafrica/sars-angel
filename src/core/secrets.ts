require('dotenv').config({ debug: process.env.DEBUG });
const { NODE_ENV, HOST, PORT, REDIS_PORT } = process.env;

export default {
	HOST: HOST,
	PORT: PORT,
	IS_PROD: NODE_ENV === 'production',
	REDIS_PORT: typeof REDIS_PORT === 'undefined' ? 6379 : parseInt(REDIS_PORT),
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	POSTMARK_SENDER: process.env.POSTMARK_SENDER || '',
	POSTMARK_KEY: process.env.POSTMARK_KEY,
	MESSAGEBIRD_KEY: process.env.MESSAGEBIRD_KEY,
	MESSAGEBIRD_TESTKEY: process.env.MESSAGEBIRD_TESTKEY,
	SMS_SENDERID: process.env.SMS_SENDERID,
	CALL_SENDERID: process.env.CALL_SENDERID
};
