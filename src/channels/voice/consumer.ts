import { getRandomNode } from './../../_helpers/entities';
import { getVoicePayload } from '../../entities/messages.entities';
import Bull, { DoneCallback } from 'bull';

import { IStatemen } from './../../entities/interface';
import { mbVoiceCallProvider } from '../../core/messagebird.provider';

export function voiceConsumer(job: Bull.Job<IStatemen[]>, done: DoneCallback) {
	const { data } = job;
	console.log('voice.consumer job started with', data);

	/* Call the Messaging Provier and Update Table Records */
	data.forEach(async (item) => {
		const phone = item.phone || '';
		const name = item.name || '';
		const message = getRandomNode(await getVoicePayload()) || '';
		await mbVoiceCallProvider(phone, name, message);
	});
	done();
}
