import { User_Group } from '../database/models';

export default class AdminServices {
	async createAdmin(data) {
		const { user_id, group_id, user_role } = data;

		return await User_Group.create({
			user_id,
			group_id,
			user_role,
		});
	}

	async findAdmin(data) {
		const { user_id, group_id, user_role } = data;

		return await User_Group.findOne({
			where: {
				user_id,
				group_id,
				user_role,
			},
		});
	}
}
