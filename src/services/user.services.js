import { User, User_Group, Group } from '../database/models';
import crypto from 'crypto';

export default class UserServices {
	async getUser(data) {
		return await User.findOne({ where: data, include: ['groups'] });
	}

	async checkUserIfMember(data) {
		return await User_Group.findOne({
			where: data,
		});
	}

	async getAllUsers() {
		return await User.findAll({ include: ['groups'] });
	}

	async createUser(data, res) {
		try {
			const newUser = await User.create(data);
			return res
				.status(201)
				.json({ essage: 'created user successfully' });
		} catch (error) {
			return res.status(406).json({
				message: error.message || "user couldn't be created",
			});
		}
	}

	async updateUser(data, id) {
		const updateUser = await User.findOne({ id });

		const {
			username,
			family_name,
			given_name,
			nationality,
			occupation,
			age,
		} = data;

		updateUser.username = username || updateUser.username;
		updateUser.family_name = family_name || updateUser.family_name;
		updateUser.given_name = given_name || updateUser.given_name;
		updateUser.nationality = nationality || updateUser.nationality;
		updateUser.occupation = occupation || updateUser.occupation;
		updateUser.age = age || updateUser.age;

		await updateUser.save();
		return updateUser;
	}

	async deleteUser({ email, id }) {
		return User.destroy({ where: { email, id } });
	}

	async getMembers(type, id) {
		const group = await User.findAll({
			include: [
				{
					model: Group,
					as: 'groups',
					where: { id },
					required: true,
					attributes: [],
					through: {
						model: User_Group,
						where: { user_role: type },
						attributes: [],
					},
				},
			],
		});

		return group;
	}

	async addMembers(data) {
		return await User_Group.create(data);
	}

	async deleteMembers(data) {
		return await User_Group.destroy({ where: data });
	}
}
