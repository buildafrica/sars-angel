import Bull, { DoneCallback } from 'bull';
import postmarkEmailProvider from '../../core/postmark.provider';

/* Helpers and Entities */
import { IStatemen } from './../../entities/interface';
import { getRandomNode } from './../../_helpers/entities';
import { getEmailPayload } from '../../entities/messages.entities';
import logger from '../../core/logger';

export function emailConsumer(job: Bull.Job<IStatemen[]>, done: DoneCallback) {
	const { data } = job;
	logger.info('email.consumer job started with', data);

	// Call the Email provider
	data.forEach(async (item) => {
		const email = item.email || '';
		const name = item.name || '';
		const message = getRandomNode(await getEmailPayload()) || '';
		postmarkEmailProvider(email, name, message);
	});
	done();
}
