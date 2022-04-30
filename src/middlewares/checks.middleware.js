import UserServices from '../services/user.services';

export const checkSuperAdmin = async (req, res, next) => {
	if (req.user.email === 'alanshema2002@gmail.com') {
		return next();
	}

	return res
		.status(401)
		.json({ message: 'Access denied, Please login as a Super Admin' });
};

export class CheckGroup {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.next = next;
	}

	async type(type) {
		const requesterMember = await new UserServices().checkUserIfMember({
			user_id: this.req.user.id,
			group_id: this.req.params.groupId,
		});

		if (!requesterMember) {
			return this.res.status(404).json({
				message:
					"You are not a member of this group or the Group specified doesn't exist",
			});
		}

		if (requesterMember.user_role !== type) {
			return this.res.status(401).json({
				message: 'Access denied, You are not an admin of this group',
			});
		}

		this.next();
	}
}
