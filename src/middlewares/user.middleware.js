import { User } from '../database/models';

export const verifyEmailExist = async (req, res, next) => {
	const { email } = req.body;

	const verifyEmail = await User.findOne({ where: { email } });

	if (verifyEmail)
		return res.status(409).json({
			message: `User with email ${email} already exist`,
		});

	next();
};
