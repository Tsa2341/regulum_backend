const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function main(receiver, subject, text, html) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const info = await transporter.sendMail({
		sender: 'regulum',
		from: {
			name: 'regulum',
			address: process.env.EMAIL_USER,
		},
		to: receiver,
		subject: subject,
		text: text,
		html: html,
	});

	console.log('Message sent: %s', info.messageId);

	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	return info;
}
