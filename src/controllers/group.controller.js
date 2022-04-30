import GroupServices from '../services/group.service';
import UserServices from '../services/user.services';

export default class GroupController {
	// get all users group info
	async getUserGroups(req, res) {
		try {
			const group = await new GroupServices().getUserGroups({
				id: req.user.id,
			});

			return res.status(200).json({
				message: 'Retrieved group data successfully',
				data: group,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	// get all groups
	async getAllGroups(req, res) {
		try {
			const groups = await new GroupServices().getAllGroups();
			res.status(200).json({
				message: 'retrieved all groups successfully',
				data: groups,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	// create a user group
	async createGroup(req, res) {
		try {
			req.body.created_by = req.user.id;

			const newGroup = await new GroupServices().createGroup(req.body);
			await new GroupServices().createMember({
				user_id: req.user.id,
				group_id: newGroup.id,
				user_role: 'ADMIN',
			});

			const updatedGroup = await new GroupServices().getGroup({
				id: newGroup.id,
			});

			return res.status(201).json({
				message: 'group created successfully',
				data: updatedGroup,
			});
		} catch (error) {
			if (error.errors) {
				return res.status(406).json({
					message: error.errors[0].message.replace(/[`'"]+/gi, ''),
				});
			}
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	// update a user group
	async updateGroup(req, res) {
		try {
			// checks if the user is a member of a group
			const userMember = await new UserServices().checkUserIfMember({
				user_id: req.user.id,
				group_id: req.params.id,
			});

			if (!userMember) {
				return res.status(401).json({
					message:
						"Access denied,Group doesn't exist or You are not the member of this group",
				});
			}

			const updatedGroup = await new GroupServices().updateGroup(
				req.body,
				req.params.id,
			);

			return res.status(200).json({
				message: 'Updated group data successfully',
				data: updatedGroup,
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}

	// delete a user group
	async deleteGroup(req, res) {
		try {
			const group = await new GroupServices().getGroup({
				id: req.params.id,
			});

			if (!group) {
				return res.status(404).json({
					message: "Group doesn't exist",
				});
			}

			const users = group.users;

			// check if the requester is a member of the group
			for (let i = 0; i < users.length; i++) {
				if (users[i].id === req.user.id) {
					await new GroupServices().deleteGroup({
						id: req.params.id,
					});

					return await res.status(200).json({
						message: 'Deleted group successfully',
					});
				}
			}

			// if not refuse to update
			return res.status(401).json({
				message: 'Access denied, You are not the member of this group',
			});
		} catch (error) {
			return res.status(500).json({
				message: 'An unexpected error occured',
				error: error.message && error.message.replace(/[`'"]+/gi, ''),
			});
		}
	}
}
