module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'User_Groups',
			[
				{
					group_id: 'a58c8f06-f79a-46c2-9c54-3803559994ee',
					user_id: '56a15f8b-8640-49f6-ada2-469caabef7ad',
					user_role: 'MEMBER',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('User_Groups', null, {});
	},
};
