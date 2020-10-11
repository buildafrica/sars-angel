import Bull from 'bull';
import ioredis from 'ioredis';
import * as BullBoard from 'bull-board';
import secrets from './core/secrets';
import { _createRepeatableTask } from './_helpers/tasks';

/* Import Producers and Consumers from Messaging Channels */
// import { emailConsumer, emailProducer } from './channels/email';
// import { SMSConsumer, SMSProducer } from './channels/sms';
import { voiceConsumer, voiceProducer } from './channels/voice';

const MAX_CONCURRENCY = 5;
// const SMS = 'SMS';
const VOICE = 'voice';
// const EMAIL = 'email'

// Initialize the Redis Connection Options
const redisConnectionOptions = {
	port: secrets.REDIS_PORT,
	host: secrets.REDIS_HOST,
	password: secrets.REDIS_PASSWORD
};

const client = new ioredis(redisConnectionOptions);
const subscriber = new ioredis(redisConnectionOptions);

/* Re-use connection in ioredis https://github.com/OptimalBits/bull/blob/master/PATTERNS.md#reusing-redis-connections */
const queueOptions: Bull.QueueOptions = {
	createClient: (__type__) => {
		switch (__type__) {
			case 'client':
				return client;
			case 'subscriber':
				return subscriber;
			default:
				return new ioredis(redisConnectionOptions);
		}
	}
};

const messageQueue = new Bull('messenger', queueOptions);

/* Notify the Bull Board UI about the Queues within the app*/
BullBoard.setQueues([ messageQueue ]);

export default async function queue() {
	// Invoke all Producers here
	// await _createRepeatableTask(messageQueue)(EMAIL, emailProducer());
	// await _createRepeatableTask(messageQueue)(SMS, SMSProducer());
	await _createRepeatableTask(messageQueue)(VOICE, voiceProducer());

	// Call Consumers here
	// messageQueue.process(EMAIL, (job, done) => emailConsumer(job, done));
	// messageQueue.process(SMS, MAX_CONCURRENCY, (job, done) => SMSConsumer(job, done));
	messageQueue.process(VOICE, MAX_CONCURRENCY, (job, done) => voiceConsumer(job, done));
}

/* We come to this later Function to immediately create a producer*/
export const createWorker = () => null;

/* Function that invokes a job's process and consumes immediately */
export const createConsumer = () => null;
