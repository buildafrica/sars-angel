import { IStatemen } from './../entities/interface';
/**
 * Tasks related to Queues and Events, based on Bull
 * 1. Make Repeatable Task: A Function to repeat a task over a period of time
 * 2. Make CronTask: A Function to generate a cron task for the Queue
 */
/* ------------------------------------------------------------------------ */

import Bull from 'bull';
type TQueueProducer = IStatemen | (IStatemen | Partial<IStatemen>)[];
type TData = TQueueProducer | (() => TQueueProducer);

export const _createRepeatableTask = (queue: Bull.Queue) => (name: string, data: TData) => {
	queue.add(name, data, {
		repeat: {
			every: 1000, // 300 minutes = 18000000
			limit: 2
		}
	});
};

export const _createCronTask = (queue: Bull.Queue, name: string, data: TData) => {
	queue.add(name, data, {
		repeat: { cron: '1 * * * *' }
	});
};

/* --------------------------------------------------------------------------- */
// Named jobs

// It is possible to give names to jobs.
// This does not change any of the mechanics of the queue but can be used for
// clearer code and better visualization in UI tools:

// // Jobs producer
// const myJob = await transcoderQueue.add('image', { input: 'myimagefile' });

// Worker
// transcoderQueue.process('image', processImage);
// // and named processors: with concurrency set at 5
// queue.process('image', 5, '/path/to/my/processor.js');
