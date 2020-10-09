import * as postmark from 'postmark';
import secrets from './secrets';
import messageBody from '../entities/body';

const postmarkEmailProvider = () => {
	/* Initialize Keys */
	const serverToken = secrets.POSTMARK_KEY || '1f3c4f96-576e-470a-8ab9-f6d55cb6ef32';
	const client = new postmark.ServerClient(serverToken);

	/* Send Email using Postmark Templates */
	return client.sendEmailWithTemplate({
		From: 'reports@auditiv.co',
		To: 'coolstepperz@gmail.com',
		TemplateAlias: 'comment-notification',
		TemplateModel: {
			product_url: 'https://twitter.com',
			product_name: 'product_name_Value',
			body: messageBody.email,
			attachment_details: [
				{
					attachment_url: 'attachment_url_Value',
					attachment_name: 'attachment_name_Value',
					attachment_size: 'attachment_size_Value',
					attachment_type: 'attachment_type_Value'
				}
			],
			commenter_name: 'State House of Assembly',
			timestamp: 'timestamp_Value',
			action_url: 'action_url_Value',
			notifications_url: 'notifications_url_Value',
			company_name: 'company_name_Value',
			company_address: 'company_address_Value'
		}
	});
};

export default postmarkEmailProvider;
