const { genSaltSync, hashSync, compareSync } = require('bcrypt');

function hashPassword(pass) {
	const salt = genSaltSync(10, 'b');

	return hashSync(pass, salt);
}

function verifyPassword(pass, hash) {
	return compareSync(pass, hash);
}

module.exports = { hashPassword, verifyPassword };
