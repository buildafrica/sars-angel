import logger from '../../core/logger';

/* Producer function returns an object of intended recipients for a channel type */
// export const emailProducer = (): IStatemen[] => {
// 	logger.info('email recipients produced');
// 	return recipients;
// };

import * as airtable from './../../core/airtable.provider';
import { getStatemen } from './../../entities/statemen.entities';
import { IStatemen, CHANNEL, CreateRecordOptionProps } from './../../entities/interface';

interface EmailProducerProps {
	email: string;
	name: string;
}

/* Producer function returns an object of intended recipients for a channel type */
export const emailProducer = async (): Promise<Partial<IStatemen>[]> => {
	logger.info('email.producer started');
	const recipients: IStatemen[] = await getStatemen();

	/* Some senators don't have their phone numbers on the list so we filter them out*/
	const result: EmailProducerProps[] = recipients
		.filter((record) => record.email !== undefined)
		.map((val, _index) => {
			return { email: val.email, name: val.name };
		});

	/* Notify Airtable that a producer has been created */
	const recordCreatedOption: CreateRecordOptionProps = {
		recipients: `${result.length} Recipients`,
		channel: CHANNEL.EMAIL,
		message: `A ${CHANNEL.EMAIL} worker has been initiated on ${new Date().toUTCString()} with ${result.length} Recipients`,
		time: new Date().toString()
	};

	await airtable.createOneRecord('Scheduled_Messages', recordCreatedOption);
	logger.info(`email.producer payload generated`);

	return result;
};
