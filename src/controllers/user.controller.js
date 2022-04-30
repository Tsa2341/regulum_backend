import UserServices from '../services/user.services';
import crypto from 'crypto';
import sendEmail from '../utils/emailSender';
import { hashPassword, verifyPassword } from '../utils/passwordSecurity';
import { generateToken, verifyToken } from '../utils/user.util';
import RandomServices from '../services/random.services';

export default class UserControllers {
	constructor() {
		this.userServices = new UserServices();
		this.randomServices = new RandomServices();
	}

	// get all users
	async getAllUsers(req, res) {
		try {
			const reqUsers = await new UserServices().getAllUsers();

			res.status(200).json({
				message: 'Retieved all users successfully',
				data: reqUsers,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'An unexpected error occurred',
			});
		}
	}

	// get one User
	async getUser(req, res) {
		try {
			const { id, email } = req.user;
			const reqUser = await new UserServices().getUser({ id, email });

			return res.status(200).json({
				message: 'retrieved user successfully',
				data: reqUser,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'An unexpected error occurred',
			});
		}
	}

	// create user method
	async createUser(req, res, next) {
		try {
			const { password, email } = req.body;

			const token = crypto.randomBytes(32).toString('hex');

			await sendEmail(
				email,
				'Email verification for regulum',
				`${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/verify/${email}/${token}`,
			);

			req.body.password = hashPassword(password);
			req.body.token = token;

			new UserServices().createUser(req.body, res);
		} catch (error) {
			res.status(500).json({
				message: error.message || 'An unexpected error occurred',
			});
		}
	}

	// login user method
	async loginUser(req, res, next) {
		const { email, password } = req.body;

		const validUser = await new UserServices().getUser({ email }, res);
		const passMatch =
			validUser && verifyPassword(password, validUser.password);

		if (!validUser || !passMatch) {
			return res.status(401).json({
				message: `Invalid credentials`,
			});
		} else if (!validUser.valid) {
			return res.status(412).json({
				message: `Email not verified, please use the link sent to your email if not reregister the account`,
			});
		} else {
			const token = await generateToken(email, validUser.id, '7 days');

			return res
				.status(200)
				.cookie('token', token, {
					httpOnly: true,
					sameSite: 'lax',
				})
				.json({
					message: 'User logged in successfully',
					token,
				});
		}
	}

	// logout user method
	async logoutUser(req, res) {
		try {
			// const token = req.headers.authorization.split(' ')[1];
			const token = req.cookies.token;

			await new RandomServices().saveWhitelistToken(token);
			const list = await new RandomServices().getWhitelistToken();

			const nowDate = new Date().getTime();
			for (let i = 0; i < list.length; i++) {
				const token = await verifyToken(list[i].value);
				const tokenDate = new Date(token.exp).getTime();

				if (tokenDate < nowDate) {
					await list[i].destroy();
				}
			}

			return res
				.status(200)
				.clearCookie('token')
				.json({ message: 'User logged out successfully' });
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	// verify email and make it a valid email
	async verifyEmail(req, res) {
		const { email, token } = req.params;

		const userInVerif = await new UserServices().getUser({ email });

		if (userInVerif === null) {
			return res.status(406).render('emailVerif', {
				text: 'Email verification failed, Please reregister to restart the proccess',
			});
		}

		if (userInVerif.valid === true) {
			return res.status(200).render('emailVerif', {
				text: 'You are already verified, Return to the app',
			});
		}

		if (userInVerif.token !== token) {
			return res.status(400).render('emailVerif', {
				text: 'Invalid token, Use the sent token in the link in your email',
			});
		}

		userInVerif.valid = true;
		userInVerif.token = null;

		await userInVerif.save();

		res.status(200).render('emailVerif', {
			text: 'Email verification was successful, Return to the app',
		});
	}

	// Update user data
	async upateUser(req, res) {
		try {
			const updatedUser = await new UserServices().updateUser(
				req.body,
				req.user.id,
			);

			return res.status(200).json({
				message: 'Updated user successfully',
				data: updatedUser,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'An unexpected error occurred',
			});
		}
	}

	// Delete one users
	async deleteUser(req, res) {
		try {
			const { email, id } = req.user;

			await new UserServices().deleteUser({ email, id });
			const logout = new UserControllers();

			await logout.logoutUser(req, res);
		} catch (error) {
			res.status(500).json({
				message: error.message || 'An unexpected error occurred',
			});
		}
	}
}
