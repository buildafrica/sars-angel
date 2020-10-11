import logger from '../../core/logger';
import recipients from '../../entities/dev.entities';
import { IStatemen } from './../../entities/interface';

/* Producer function returns an object of intended recipients for a channel type */
export const voiceProducer = (): Omit<IStatemen | 'email', 'state'>[] => {
	logger.info('VOICE CALL recipients created');
	const result = recipients.map((val, _index) => ({ phone: val.phone.replace(/^[0]/, '+234'), name: val.name }));
	console.log('VOICE CALL Producer Payload --->', result);
	return result;
};
