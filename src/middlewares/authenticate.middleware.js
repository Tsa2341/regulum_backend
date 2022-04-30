const { verifyToken } = require('../utils/user.util');

export default async function authenticate(req, res, next) {
	//  checks if the token and the email are valid and verified

	try {
		const token = req.cookies.token;
		const valid = token && (await verifyToken(token));

		if (!token || !valid)
			return res.status(401).json({
				message: 'seems like you are not logged in, please login',
			});
		req.user = { email: valid.email, id: valid.id };

		next();
	} catch (error) {
		return res.status(401).json({
			message: 'An unexpected error occured',
			data: error.message,
		});
	}
}
