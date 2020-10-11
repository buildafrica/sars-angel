import logger from '../../core/logger';
import recipients from '../../entities/dev.entities';
import { IStatemen } from './../../entities/interface';

/* Producer function returns an object of intended recipients for a channel type */
export const emailProducer = (): IStatemen[] => {
	logger.info('email recipients produced');
	return recipients;
};
