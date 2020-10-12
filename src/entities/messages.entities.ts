/* Optionally create dumb modules */
import * as airtable from '../core/airtable.provider';

interface MessageBodyProps {
	id: string;
	email: string;
	voice: string;
	sms: string;
	whatsapp: string;
	twitter: string;
}
const PARAMS = {
	baseName: 'Messages',
	baseView: 'Main'
};

/* Retrieves an array of objects with all messages type for every channel */
export const getAllMessages = async (): Promise<MessageBodyProps[]> => {
	const data = await airtable
		.getSimpleCollection(PARAMS)
		.all()
		.then((v) => v.map((record) => ({ id: record.id, ...record.fields })));
	return data;
};

/* Function returns an array of strings with all message templates in the SMS column on the Table */
export const getSMSPayload = async (): Promise<string[]> => {
	const data = await airtable.getSimpleCollection(PARAMS).all().then((v) => v.map((record) => record.fields.sms));
	return data;
};

/* Function returns an array of strings with all message templates in the Email column on the Table */
export const getEmailPayload = async (): Promise<string[]> => {
	const data = await airtable.getSimpleCollection(PARAMS).all().then((v) => v.map((record) => record.fields.email));
	return data;
};

/* Function returns an array of strings with all message templates in the Voice column on the Table */
export const getVoicePayload = async (): Promise<string[]> => {
	const data = await airtable.getSimpleCollection(PARAMS).all().then((v) => v.map((record) => record.fields.voice));
	return data;
};
