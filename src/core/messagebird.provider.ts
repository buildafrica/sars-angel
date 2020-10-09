var messagebird = require('messagebird')('g3tlWqJBpwWzsu1krPiu4CMGt'); //TEST API KEY

/**
 * Methods to manage messaging Triggers =
 */
export const triggerVoice = async () => {
	const voiceParams = {
		recipients: [ '+233506391853' ] /* Messagebird can queue array items for sending */,
		body: `Hi CustomerName, we reaching out to you on behalf of our userName`,
		language: 'en-au',
		voice: 'female',
		originator: '+2330565521580'
	};

	await messagebird.voice_messages.create(voiceParams, function(err: any, data: any) {
		if (err) {
			return console.log(err);
		}
		console.log(data);
	});
};

export const triggerSMS = async () => {
	const params = {
		originator: 'ORIGINATOR',
		recipients: [ '+233506391853' ],
		body: 'This is a test message'
	};

	await messagebird.messages.create(params, (err: any, data: any) => {
		if (err) {
			return console.log(err);
		}
		console.log(data);
	});
};

triggerSMS();
