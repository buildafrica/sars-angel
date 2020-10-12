import * as airtable from './airtable.provider';
import * as mb from 'messagebird';
import { MessageParameters } from 'messagebird/types/messages';
import { VoiceParametersWithRecipients } from 'messagebird/types/voice_messages';

/* Entties and Logger */
import logger from '../core/logger';
import secrets from '../core/secrets';
import messageBody from '../entities/body';
import { STATUS, CHANNEL } from '../entities/interface';

const key = secrets.MESSAGEBIRD_TESTKEY || '';
const messagebird = mb.default(key);

export const mbVoiceCallProvider = async (recipientPhone: string, recipientName: string, message: string) => {
	airtable.notifyRecord(message, recipientName, STATUS.DELIVERED, CHANNEL.VOICE);

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
		return logger.info(JSON.stringify(data));
	});
};

export const mbSMSProvider = async (recipientPhone: string, recipientName: string, message: string) => {
	airtable.notifyRecord(message, recipientName, STATUS.DELIVERED, CHANNEL.VOICE);

	const smsParams: MessageParameters = {
		originator: '#EndSARSNow',
		recipients: [ recipientPhone ],
		body: `Dear ${recipientName}, ${messageBody.sms}`
	};

	await messagebird.messages.create(smsParams, (err, data) => {
		if (err) {
			airtable.notifyRecord(message, recipientName, STATUS.FAILED, CHANNEL.VOICE);
			logger.error(err);
		}
		console.log(data);
		return logger.info(JSON.stringify(data));
	});
};
