module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Groups',
			[
				{
					id: 'a58c8f06-f79a-46c2-9c54-3803559994ee',
					type: 'MANAGING',
					name: 'Default group',
					goal: 'Testing',
					description:
						'A simple group crreted for testing. Not to be used in production',
					created_by: '56a15f8b-8640-49f6-ada2-469caabef7ad',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Groups', null, {});
	},
};
