import Bull from 'bull';
import { DoneCallback } from 'bull';
import { IStatemen } from './../../entities/interface';
import postmarkEmailProvider from '../../core/postmark.provider';

export function emailConsumer(job: Bull.Job<IStatemen[]>, done: DoneCallback) {
	const { data } = job;
	console.log('EMAIL CONSUMER JOB STARTED ---->', job);

	// Call the Email provider
	data.forEach((item) => {
		const email = item.email || '';
		const name = item.name || '';
		postmarkEmailProvider(email, name);
	});
	done();
}
