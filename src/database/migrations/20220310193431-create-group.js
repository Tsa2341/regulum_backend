const { accountTypes } = require('../../utils/enum.utils');

module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('Groups', {
			id: {
				allowNull: false,
				primaryKey: true,
				unique: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			type: {
				type: DataTypes.ENUM,
				values: accountTypes,
				defaultValue: 'managing',
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			goal: {
				type: DataTypes.TEXT('large'),
			},
			description: {
				type: DataTypes.TEXT('large'),
			},
			created_by: {
				type: DataTypes.UUID,
				allowNullL: false,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
			},
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('Groups');
	},
};
