require('dotenv').config();

module.exports = {
	development: {
		url: process.env.DEV_DB,
	},
	test: {
		url: process.env.TEST_DB,
	},
	production: {
		url: process.env.PROD_DB,
	},
};
