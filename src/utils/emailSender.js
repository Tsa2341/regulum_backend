import 'dotenv';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEmail(senderEmail, subject, Url) {
	try {
		const msg = {
			to: senderEmail, // Change to your recipient
			from: {
				name: 'Regulum',
				email: 'tsa2341@gmail.com',
			}, // Change to your verified sender
			subject,
			templateId: 'd-5ee49f6fbe2c48c6a415ef6ad6913c1b',
			dynamic_template_data: {
				Url,
				Sender_Name: 'regulum',
				Sender_Address: 'Kigali/Gasabo',
				Sender_City: 'Kigali',
				Sender_State: 'Kigali',
				Sender_Zip: 403,
			},
		};

		const res = await sgMail.send(msg);

		return res;
	} catch (error) {
		throw "couldn't send the verification email";
	}
}
