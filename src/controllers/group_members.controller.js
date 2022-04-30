import UserServices from '../services/user.services';

export default class GroupMemberControllers {
	async getMembers(req, res) {
		try {
			const type = String(req.params.type).toUpperCase();

			const userMember = await new UserServices().checkUserIfMember({
				user_id: req.user.id,
				group_id: req.params.groupId,
			});

			if (!userMember) {
				return res.status(401).json({
					message:
						"Access Denied, Group doesn't or you are not a member of this group",
				});
			}

			const users = await new UserServices().getMembers(
				type,
				req.params.groupId,
				req.user.id,
			);

			res.status(200).json({
				message: 'Retrieved group members successfully',
				data: users,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	async addMembers(req, res) {
		try {
			const { user_ids } = req.body;

			for (let i = 0; i < user_ids.length; i++) {
				const user_id = user_ids[i];

				const user = await new UserServices().getUser({ id: user_id });
				const userMember = await new UserServices().checkUserIfMember({
					user_id: user_id,
					group_id: req.params.groupId,
				});

				if (!user) {
					return res.status(404).json({
						message: "User doesn't exist",
					});
				}

				if (userMember) {
					return res.status(409).json({
						message: 'User is already a member in this group',
					});
				}
			}

			user_ids.map(async (user_id) => {
				await new UserServices().addMembers({
					user_id: user_id,
					group_id: req.params.groupId,
					user_role: 'MEMBER',
				});
			});

			return res.status(201).json({
				message: 'Added all members successfully',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	async deleteMembers(req, res) {
		try {
			const { user_ids } = req.body;

			for (let i = 0; i < user_ids.length; i++) {
				const user_id = user_ids[i];

				const user = await new UserServices().getUser({ id: user_id });
				const userMember = await new UserServices().checkUserIfMember({
					user_id: user_id,
					group_id: req.params.groupId,
				});

				if (!user) {
					return res.status(404).json({
						message: "User doesn't exist",
					});
				}

				if (!userMember) {
					return res.status(409).json({
						message: 'User is not a member of this group',
					});
				}

				if (userMember.user_role !== 'MEMBER') {
					return res.status(400).json({
						message: "Access denied, can't delete an admin",
					});
				}
			}

			user_ids.map(async (user_id) => {
				await new UserServices().deleteMembers({
					user_id: user_id,
					group_id: req.params.groupId,
					user_role: 'MEMBER',
				});
			});

			return res.status(201).json({
				message: 'Deleted all members successfully',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}
}
