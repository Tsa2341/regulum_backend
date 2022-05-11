import Joi from 'joi';

export const registerValidation = (req, res, next) => {
	const registerSchema = Joi.object({
		email: Joi.string().empty().required().email(),
		password: Joi.string()
			.empty()
			.required()
			.regex(/^(?=.*[0-9])(?=.*[A-Z])(\w){8,}$/)
			.message({
				'string.pattern.base':
					'Password must contain atleast one number, upper-case and longer than 8 characters',
			}),
	});

	const isValid = registerSchema.validate(req.body);

	if (isValid.error)
		return res.status(400).json({ message: isValid.error.message.replace(/["'`]/gi, '') });

	next();
};

export const updateValidation = (req, res, next) => {
	const updateSchema = Joi.object({
		username: Joi.string().empty(),
		family_name: Joi.string().empty(),
		given_name: Joi.string().empty(),
		nationality: Joi.string().empty(),
		occupation: Joi.string().empty(),
		age: Joi.number().empty(),
	});

	const isValid = updateSchema.validate(req.body);

	if (isValid.error)
		return res.status(400).json({ message: isValid.error.message.replace(/["'`]/gi, '') });

	next();
};
