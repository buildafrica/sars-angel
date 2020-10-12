import logger from '../../core/logger';
import * as airtable from './../../core/airtable.provider';
import { getStatemen } from './../../entities/statemen.entities';
import { IStatemen, CHANNEL } from './../../entities/interface';

interface VoiceProducerProps {
	phone: string;
	name: string;
}

/* Producer function returns an object of intended recipients for a channel type */
export const voiceProducer = async (): Promise<Omit<IStatemen | 'email', 'state'>[]> => {
	logger.info('voice.producer started');
	const recipients: IStatemen[] = await getStatemen();

	/* Some senators don't have their phone numbers on the list so we filter them out*/
	const result: VoiceProducerProps[] = recipients
		.filter((record) => record.phone !== undefined)
		.map((val, _index) => {
			return { phone: val.phone.replace(/^[0]/, '+234'), name: val.name };
		});

	/* Notify Airtable that a producer has been created */
	const recordCreatedOption = {
		recipients: `${result.length} Recipients`,
		channel: CHANNEL.VOICE,
		message: `A ${CHANNEL.VOICE} worker has been initiated on ${new Date().toUTCString()} with ${result.length} Recipients`,
		time: new Date().toString()
	};

	await airtable.createOneRecord('Scheduled_Messages', recordCreatedOption);
	logger.info(`voice.producer payload generated`);

	return result;
};
