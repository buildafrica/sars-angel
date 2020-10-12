import Bull, { DoneCallback } from 'bull';
import { getRandomNode } from './../../_helpers/entities';
import { getSMSPayload } from '../../entities/messages.entities';

import { IStatemen } from './../../entities/interface';
import { mbSMSProvider } from '../../core/messagebird.provider';

export async function SMSConsumer(job: Bull.Job<IStatemen[]>, done: DoneCallback) {
	const { data } = job;
	console.log('SMS JOB STARTED ---->', job);

	// Call the Email provider
	data.forEach(async (item) => {
		const phone = item.phone || '';
		const name = item.name || '';
		const message = getRandomNode(await getSMSPayload()) || '';
		await mbSMSProvider(phone, name, message);
	});
	done();
}
