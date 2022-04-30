import Joi from 'joi';
import { accountTypes } from '../utils/enum.utils';

export default function groupValidation(req, res, next) {
	const groupValidation = Joi.object({
		type: Joi.valid(...accountTypes)
			.required()
			.empty(),
		name: Joi.string().required().empty(),
		goal: Joi.string().empty(),
		description: Joi.string().empty(),
	});

	const valid = groupValidation.validate(req.body);

	if (valid.error)
		return res.status(406).json({
			message: valid.error.details[0].message.replace(/["'`]+/gi, ''),
		});

	next();
}

export function updateGroupValidation(req, res, next) {
	const updateGroupValidation = Joi.object({
		goal: Joi.string().empty(),
		description: Joi.string().empty(),
	});

	const valid = updateGroupValidation.validate(req.body);

	if (valid.error)
		return res.status(406).json({
			message: valid.error.details[0].message.replace(/["'`]+/gi, ''),
		});

	next();
}

export function membersValidation(req, res, next) {
	const membersValidation = Joi.object({
		user_ids: Joi.array().items(Joi.string().uuid()).empty().required(),
	});

	const valid = membersValidation.validate(req.body);

	if (valid.error)
		return res.status(406).json({
			message: valid.error.details[0].message.replace(/["'`]+/gi, ''),
		});

	next();
}
