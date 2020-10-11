import Bull, { DoneCallback } from 'bull';

import { IStatemen } from './../../entities/interface';
import { mbSMSProvider } from '../../core/messagebird.provider';

export async function SMSConsumer(job: Bull.Job<IStatemen[]>, done: DoneCallback) {
	const { data } = job;
	console.log('SMS JOB STARTED ---->', job);

	// Call the Email provider
	await data.forEach(async (item) => {
		const phone = item.phone || '';
		const name = item.name || '';
		await mbSMSProvider(phone, name);
	});
	done();
}
