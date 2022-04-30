import { Group, User, User_Group } from '../database/models';
import { userGroupRoles } from '../utils/enum.utils';

export default class GroupServices {
	async getAllGroups() {
		return Group.findAll({ include: 'users' });
	}

	async getGroup(data) {
		return Group.findOne({ where: data, include: 'users' });
	}

	async getUserGroups(data) {
		return Group.findAll({
			include: [
				{
					model: User,
					as: 'users',
					where: data,
					// through: {
					// 	attributes: [],
					// },
				},
			],
		});
	}

	async createGroup(data) {
		return await Group.create(data);
	}

	async updateGroup(data, id) {
		const updateGroup = await Group.findOne({ where: { id } });

		const { goal, description } = data;

		updateGroup.goal = goal || updateGroup.goal;
		updateGroup.description = description || updateGroup.description;

		await updateGroup.save();
		return updateGroup;
	}

	async deleteGroup(data) {
		return await Group.destroy({ where: data });
	}

	async getGroupUserCreated(data) {
		const { user_id } = data;

		return await Group.findAll({ where: { created_by: user_id } });
	}

	async createMember(data) {
		return User_Group.create(data);
	}
}
