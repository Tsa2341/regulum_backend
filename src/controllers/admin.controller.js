import AdminServices from '../services/admin.services';

export default class AdminControllers {
	async createAdmin(req, res) {
		try {
			const { user_id, group_id, user_role } = req.body;

			const adminExist = await new AdminServices().findAdmin({
				user_id,
				group_id,
				user_role,
			});

			if (adminExist) {
				return res.status(409).json({
					message: `User with role ${user_role} already exist in the group`,
				});
			}

			const admin = await new AdminServices().createAdmin({
				user_id,
				group_id,
				user_role,
			});
			return res.status(201).json({
				message: 'Created admin successfully',
				data: admin,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	async getAdminUser(data) {}
}
