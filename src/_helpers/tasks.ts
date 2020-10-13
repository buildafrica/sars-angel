import { IStatemen } from './../entities/interface';
/**
 * 1. Make Repeatable Task: A Function to repeat a task over a period of time
 * 2. Make CronTask: A Function to generate a cron task for the Queue
 */
/* ------------------------------------------------------------------------ */

import Bull from 'bull';
type TQueueProducer = IStatemen | (IStatemen | Partial<IStatemen>)[];
type TData = TQueueProducer | (() => TQueueProducer);

export const _createRepeatableTask = (queue: Bull.Queue) => <T extends TData>(name: string, data: T) => {
	queue.add(name, data, {
		repeat: {
			every: 1800, // 300 minutes = 18000000
			limit: 2
		}
	});
};

export const _createCronTask = (queue: Bull.Queue, name: string, data: TData) => {
	queue.add(name, data, {
		repeat: { cron: '1 * * * *' }
	});
};
