'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('User_Groups', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			group_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			user_role: {
				type: DataTypes.STRING,
				allowNull: false,
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
		await queryInterface.dropTable('User_Groups');
	},
};
