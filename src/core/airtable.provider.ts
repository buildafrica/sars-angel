import Airtable from 'airtable';
import logger from './logger';
import secrets from './secrets';
import { STATUS, CHANNEL } from '../entities/interface';

/* Configure API Access for Airtable Base */
interface TableOptionProps {
	baseName: string;
	baseView: string;
	limit?: number | 10;
}

interface IManyRecordField {
	/* An Array of any interface type must have a single key of name fields that contains payload */
	fields: Record<any, string | number | boolean>;
}

export const getSimpleCollection = (options: Omit<TableOptionProps, 'limit'>) => {
	const { baseName, baseView } = options;
	const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

	return base(baseName).select({
		view: baseView
	});
};

export const getCollections = (options: TableOptionProps) => {
	const { baseName, limit, baseView } = options;
	const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

	return base(baseName).select({
		maxRecords: limit,
		view: baseView
	});
};

export const createOneRecord = <T extends Object>(baseName: string, payload: T) => {
	const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

	logger.info(`creating new record in ${baseName}`);

	return base(baseName).create([
		{
			fields: {
				...payload
			}
		}
	]);
};

export const createManyRecord = <T extends IManyRecordField>(baseName: string, payload: T[]) => {
	const base = new Airtable({ apiKey: secrets.AIRTABLE_KEY }).base(secrets.AIRTABLE_BASE);

	logger.info(`creating new record in ${baseName}`);
	return base(baseName).create([ [ ...payload ] ]);
};

export const notifyRecord = async (message: string, recipientName: string, status: STATUS, channel: CHANNEL) => {
	logger.debug(`airtable.provider notify for ${status} status`);
	const recordCreatedOption = {
		Recipient: recipientName,
		Message: message,
		Status: status,
		Time: new Date().toString(),
		Channel: channel
	};
	await createOneRecord('Delivered_Messages', recordCreatedOption);
};
