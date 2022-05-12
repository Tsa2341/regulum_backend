const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function main(receiver, subject, text, html) {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			clientId: process.env.GMAIL_CLIENT_ID,
			clientSecret: process.env.GMAIL_CLIENT_SECRETE,
		},
	});

	const info = await transporter
		.sendMail({
			from: {
				name: 'regulum',
				address: process.env.GMAIL_USER,
			},
			to: receiver,
			subject: subject,
			text: text,
			html: html,
			auth: {
				user: 'Tsa2341@gmail.com',
				refreshToken: process.env.GMAIL_REFRESH_TOKEN,
				accessToken: process.env.GMAIL_ACCESS_TOKEN,
				expires: 1484314697598,
			},
		})
		.catch((error) => {
			throw Error(error);
		});

	console.log('Message sent: %s', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	return info;
}
