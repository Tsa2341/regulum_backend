import 'dotenv';
import { V4 } from 'paseto';
import { generateKeyPair } from 'crypto';
import { appendFileSync, readFileSync, accessSync } from 'fs';
import path from 'path';

const { sign, verify } = V4;

generateKeyPair(
	'ed25519',
	{
		modulusLength: 4096, // It holds a number. It is the key size in bits and is applicable for RSA, and DSA algorithm only.
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem',
		},
		privateKeyEncoding: {
			type: 'pkcs8', //Note again the type is set to pkcs1
			format: 'pem',
			//cipher: "aes-256-cbc", //Optional
			//passphrase: "", //Optional
		},
	},
	(err, publicKey, privateKey) => {
		// Handle errors and use the generated key pair.
		if (err) return console.log('Error! = ', err);

		try {
			accessSync(path.join(__dirname, '../../keys/privateKey.text'));
		} catch (error) {
			appendFileSync(
				path.join(__dirname, '../../keys/privateKey.text'),
				privateKey,
			);
		}
	},
);

export const generateToken = async (email, id, expiresIn) => {
	const key = readFileSync(
		path.join(__dirname, '../../keys/privateKey.text'),
	);
	return sign({ email, id }, key.toString('ascii'), { expiresIn });
};

export const verifyToken = async (token) => {
	const key = readFileSync(
		path.join(__dirname, '../../keys/privateKey.text'),
	);
	return verify(token, key.toString('ascii'));
};
