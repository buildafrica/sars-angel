import Bull from 'bull';
import * as BullBoard from 'bull-board';
import secrets from './core/secrets';
import { _createRepeatableTask } from './_helpers/tasks';

/* Import Producers and Consumers from Messaging Channels */
import { emailConsumer, emailProducer } from './channels/email';
import { SMSProducer } from './channels/sms/producer';
import { SMSConsumer } from './channels/sms';

// Initialize the Task Runner Bull.Queue<any>
const messageQueue = new Bull('messenger', {
	redis: {
		port: secrets.REDIS_PORT,
		host: secrets.REDIS_HOST,
		password: secrets.REDIS_PASSWORD
	}
});

/* Notify the Bull Board UI about the Queues within the app*/
BullBoard.setQueues([ messageQueue ]);

export default async function queue() {
	// Invoke all Producers here
	await _createRepeatableTask(messageQueue)('email', emailProducer());
	await _createRepeatableTask(messageQueue)('SMS', SMSProducer());

	// Call Consumers here
	messageQueue.process('email', (job, done) => emailConsumer(job, done));
	messageQueue.process('SMS', (job, done) => SMSConsumer(job, done));
}
