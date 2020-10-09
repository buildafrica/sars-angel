import Bull from 'bull';
import * as BullBoard from 'bull-board';
import secrets from './core/secrets';

// Bull.Queue<any>
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
	// Repeat every 10 seconds for 5 times.
	const myJob = await messageQueue.add(
		{ test: 'bar' },
		{
			repeat: {
				every: 10000,
				limit: 5
			}
		}
	);

	// Repeat payment job once every day at 3:15 (am)
	// messageQueue.add('string Blob', { repeat: { cron: '1 * * * *' } });
	console.log(messageQueue, myJob);
}

// 1 * * * * Cron for every minute
