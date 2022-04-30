import UserServices from '../services/user.services';

export default class GroupAdminControllers {
	async getAdmins(req, res) {
		try {
			const userAdmin = await new UserServices().checkUserIfAdmin({
				user_id: req.user.id,
				group_id: req.params.groupId,
			});

			if (!userAdmin) {
				return res.status(401).json({
					message:
						"Access Denied, Group doesn't or you are not a member of this group",
				});
			}

			const users = await new UserServices().getMembers(
				'ADMIN',
				req.params.groupId,
				req.user.id,
			);

			res.status(200).json({
				message: 'Retrieved group Admins successfully',
				data: users,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	async createAdmins(req, res) {
		try {
			const { user_ids } = req.body;

			for (let i = 0; i < user_ids.length; i++) {
				const user_id = user_ids[i];

				const user = await new UserServices().getUser({ id: user_id });
				const userAdmin = await new UserServices().checkUserIfAdmin({
					user_id: user_id,
					group_id: req.params.groupId,
				});

				if (!user) {
					return res.status(404).json({
						message: "User doesn't exist",
					});
				}

				if (userAdmin.user_role === 'ADMIN') {
					return res.status(409).json({
						message: 'User is already an admin of this group',
					});
				}
			}

			user_ids.map(async (user_id) => {
				const userAdmin = await new UserServices().checkUserIfAdmin({
					user_id: user_id,
					group_id: req.params.groupId,
				});

				if (userAdmin) {
					userAdmin.user_role = 'ADMIN';
				} else {
					await new UserServices().addAdmins({
						user_id: user_id,
						group_id: req.params.groupId,
						user_role: 'ADMIN',
					});
				}
			});

			return res.status(201).json({
				message: 'Created all Admins successfully',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	async deleteAdmins(req, res) {
		try {
			const { user_ids } = req.body;

			for (let i = 0; i < user_ids.length; i++) {
				const user_id = user_ids[i];

				const user = await new UserServices().getUser({ id: user_id });
				const userAdmin = await new UserServices().checkUserIfAdmin({
					user_id: user_id,
					group_id: req.params.groupId,
				});

				if (!user) {
					return res.status(404).json({
						message: "User doesn't exist",
					});
				}

				if (!userAdmin) {
					return res.status(409).json({
						message: 'User is not a admin of this group',
					});
				}

				if (userAdmin.user_role !== 'MEMBER') {
					return res.status(400).json({
						message: "Access denied, can't delete an admin",
					});
				}
			}

			user_ids.map(async (user_id) => {
				await new UserServices().deleteAdmins({
					user_id: user_id,
					group_id: req.params.groupId,
					user_role: 'MEMBER',
				});
			});

			return res.status(201).json({
				message: 'Deleted all Admins successfully',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}
}
