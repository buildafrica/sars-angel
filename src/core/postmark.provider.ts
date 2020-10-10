import * as postmark from 'postmark';
import { MessageSendingResponse } from 'postmark/dist/client/models';
import secrets from './secrets';
import messageBody from '../entities/body';

const postmarkEmailProvider = async (recipientEmail: string, recipientName: string) => {
	/* Initialize Keys */
	const serverToken = secrets.POSTMARK_KEY || '';
	const client = new postmark.ServerClient(serverToken);

	/* Send Email using Postmark Templates */
	await client
		.sendEmailWithTemplate({
			From: secrets.POSTMARK_SENDER,
			To: recipientEmail,
			TemplateAlias: 'comment-notification',
			TemplateModel: {
				product_url: 'https://statehouse.gov.ng/',
				product_name: '#EndSARSNow #ReformPoliceNG',
				body: `Dear ${recipientName}, ${messageBody.email}`,
				attachment_details: [
					{
						attachment_url:
							'https://www.safewaysagency.com/wp-content/uploads/2020/06/Nigeria-640x640-1.jpg',
						attachment_name: '#Nigeria',
						attachment_size: 'small',
						attachment_type: 'jpg'
					}
				],
				commenter_name: 'The Youths of Nigeria',
				timestamp: Date.now(),
				action_url: 'https://statehouse.gov.ng/',
				notifications_url: 'https://statehouse.gov.ng/',
				company_name: 'Arise oh Compatriots, Nigerias call obey',
				company_address: 'Federal Government of Nigeria'
			}
		})
		.then((response: MessageSendingResponse): MessageSendingResponse => {
			console.log(response);
			return response;
		})
		.catch((err) => console.error(err));
};

export default postmarkEmailProvider;
