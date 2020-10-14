import * as airtable from './airtable.provider';
import * as mb from 'messagebird';
import { MessageParameters } from 'messagebird/types/messages';
import { VoiceParametersWithRecipients } from 'messagebird/types/voice_messages';

/* Entties and Logger */
import logger from '../core/logger';
import secrets from '../core/secrets';
import { STATUS, CHANNEL } from '../entities/interface';

const key = secrets.MESSAGEBIRD_KEY || '';
const messagebird = mb.default(key);

export const mbVoiceCallProvider = async (recipientPhone: string, recipientName: string, message: string) => {
	const voiceParams: VoiceParametersWithRecipients = {
		body: `Dear ${recipientName}, ${message}`,
		language: 'en-au',
		recipients: [ recipientPhone ],
		voice: 'female',
		originator: secrets.CALL_SENDERID
	};

	await messagebird.voice_messages.create(voiceParams, function(err, data) {
		if (err) {
			logger.error('voice_message.create message sending failed');
			airtable.notifyRecord(message, recipientName, STATUS.FAILED, CHANNEL.VOICE);

			console.error(err);
		}
		airtable.notifyRecord(message, recipientName, STATUS.DELIVERED, CHANNEL.VOICE);
		return logger.info(JSON.stringify(data));
	});
};

export const mbSMSProvider = async (recipientPhone: string, recipientName: string, message: string) => {
	const smsParams: MessageParameters = {
		originator: secrets.SMS_SENDERID,
		recipients: [ recipientPhone ],
		body: `Dear ${recipientName}, ${message}`
	};

	await messagebird.messages.create(smsParams, function(err, data) {
		if (err) {
			airtable.notifyRecord(message, recipientName, STATUS.FAILED, CHANNEL.SMS);
			logger.error(err);
		}
		airtable.notifyRecord(message, recipientName, STATUS.DELIVERED, CHANNEL.SMS);
		return logger.info(JSON.stringify(data));
	});
};
