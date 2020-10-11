import logger from '../../core/logger';
import recipients from '../../entities/dev.entities';
import { IStatemen } from './../../entities/interface';

/* Producer function returns an object of intended recipients for a channel type */
export const SMSProducer = (): Omit<IStatemen | 'email', 'state'>[] => {
	logger.info('SMS recipients created');
	const result = recipients.map((val, _index) => ({ phone: val.phone.replace(/^[0]/, '+234'), name: val.name }));
	console.log('SMS Producer Payload --->', result);
	return result;
};
