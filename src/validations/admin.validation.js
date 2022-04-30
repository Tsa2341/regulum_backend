import Joi from 'joi';
import { userGroupRoles } from '../utils/enum.utils';

export default function adminValidation(req, res, next) {
	const adminValidation = Joi.object({
		group_id: Joi.string().uuid().required().empty(),
		user_id: Joi.string().uuid().required().empty(),
		user_role: Joi.valid(...userGroupRoles)
			.required()
			.empty(),
	});

	const valid = adminValidation.validate(req.body);

	if (valid.error)
		return res.status(406).json({
			message: valid.error.details[0].message.replace(/["'`]+/gi, ''),
		});

	next();
}
