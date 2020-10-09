import * as mb from 'messagebird';
import { MessageParameters } from 'messagebird';
import { VoiceParameters } from 'messagebird/types/voice_messages';

/* Entties and Logger */
import logger from '../core/logger';
import secrets from '../core/secrets';
import messageBody from '../entities/body';

const key = secrets.MESSAGEBIRD_KEY || '';
const messagebird = mb.default(key);

export const mbVoiceCallProvider = async (recipientPhone: string, recipientName: string) => {
	// const recipients = [ '+233506391853' ] /* Messagebird can queue array items for sending */;
	const voiceParams: VoiceParameters = {
		body: `Dear ${recipientName}, ${messageBody.voice}`,
		language: 'en-au',
		voice: 'female',
		originator: '#EndSARSNow'
	};

	await messagebird.voice_messages.create([ recipientPhone ], voiceParams, function(err, data) {
		if (err) {
			return logger.error(err);
		}
		logger.info(data);
		return data;
	});
};

export const mbSMSProvider = async (recipientPhone: string, recipientName: string) => {
	const smsParams: MessageParameters = {
		originator: '#EndSARSNow',
		recipients: [ recipientPhone ],
		body: `Dear ${recipientName}, ${messageBody.sms}`
	};

	await messagebird.messages.create(smsParams, (err, data) => {
		if (err) {
			return logger.error(err);
		}
		logger.info(data);
		return data;
	});
};
