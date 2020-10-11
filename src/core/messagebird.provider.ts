import * as mb from 'messagebird';
import { MessageParameters } from 'messagebird/types/messages';
import { VoiceParametersWithRecipients } from 'messagebird/types/voice_messages';

/* Entties and Logger */
import logger from '../core/logger';
import secrets from '../core/secrets';
import messageBody from '../entities/body';

const key = secrets.MESSAGEBIRD_TESTKEY || '';
const messagebird = mb.default(key);

export const mbVoiceCallProvider = async (recipientPhone: string, recipientName: string) => {
	console.log('sending love and voice', recipientName, recipientPhone);

	// const recipients = [ '+233506391853' ] /* Messagebird can queue array items for sending */;
	const voiceParams: VoiceParametersWithRecipients = {
		body: `Dear ${recipientName}, ${messageBody.voice}`,
		language: 'en-au',
		recipients: [ recipientPhone ],
		voice: 'female',
		originator: secrets.CALL_SENDERID
	};

	await messagebird.voice_messages.create(voiceParams, function(err, data) {
		if (err) {
			logger.error('voice_message.create message sending failed');
			console.error(err);
		}
		return logger.info(JSON.stringify(data));
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
		console.log(data);
		return logger.info(JSON.stringify(data));
	});
};
