const { randoms } = require('../../utils/enum.utils');

module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('Randoms', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: {
				type: DataTypes.ENUM,
				values: randoms,
			},
			value: DataTypes.TEXT('medium'),
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
		await queryInterface.dropTable('Randoms');
	},
};
