require('dotenv').config({ debug: process.env.DEBUG });
const { NODE_ENV, HOST, PORT, REDIS_PORT } = process.env;

export default {
	IS_PROD: NODE_ENV === 'production',
	HOST: typeof HOST === 'undefined' ? 'localhost' : HOST,
	PORT: typeof PORT === 'undefined' ? 4004 : parseInt(PORT),
	REDIS_PORT: typeof REDIS_PORT === 'undefined' ? 6379 : parseInt(REDIS_PORT),
	REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
	REDIS_PASSWORD: process.env.REDIS_PASSWORD,
	POSTMARK_SENDER: process.env.POSTMARK_SENDER || '',
	POSTMARK_KEY: process.env.POSTMARK_KEY,
	MESSAGEBIRD_KEY: process.env.MESSAGEBIRD_KEY
};
