'use strict';

const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../../utils/passwordSecurity.js');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: '56a15f8b-8640-49f6-ada2-469caabef7ad',
					email: 'alanshema2002@gmail.com',
					password: hashPassword('nviua79042HHKSC0nlcsds'),
					username: 'super_admin',
					family_name: 'super',
					given_name: 'admin',
					nationality: 'Rwanda',
					occupation: 'admin',
					profile_image:
						'https://res.cloudinary.com/demo/image/upload/v1570979139/eneivicys42bq5f2jpn2.jpg',
					age: 30,
					valid: true,
					token: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
