import Bull from 'bull';
import * as BullBoard from 'bull-board';
import secrets from './core/secrets';
import { _createRepeatableTask } from './_helpers/tasks';

/* Import Producers and Consumers from Messaging Channels */
// import { emailConsumer, emailProducer } from './channels/email';
import { SMSConsumer, SMSProducer } from './channels/sms';
import { voiceConsumer, voiceProducer } from './channels/voice';

const MAX_CONCURRENCY = 5;

// Initialize the Task Runner Bull.Queue<any>
const redisConnectionOptions = {
	port: secrets.REDIS_PORT,
	host: secrets.REDIS_HOST,
	password: secrets.REDIS_PASSWORD
};

const messageQueue = new Bull('messenger', { redis: redisConnectionOptions });

/* Notify the Bull Board UI about the Queues within the app*/
BullBoard.setQueues([ messageQueue ]);

export default async function queue() {
	// Invoke all Producers here
	// await _createRepeatableTask(messageQueue)('email', emailProducer());
	await _createRepeatableTask(messageQueue)('SMS', SMSProducer());
	await _createRepeatableTask(messageQueue)('voice', voiceProducer());

	// Call Consumers here
	// messageQueue.process('email', (job, done) => emailConsumer(job, done));
	messageQueue.process('SMS', MAX_CONCURRENCY, (job, done) => SMSConsumer(job, done));
	messageQueue.process('voice', MAX_CONCURRENCY, (job, done) => voiceConsumer(job, done));
}

/* We come to this later Function to immediately create a producer*/
export const createWorker = () => null;

/* Function that invokes a job's process and consumes immediately */
export const createConsumer = () => null;
