'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				unique: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
			},
			family_name: {
				type: DataTypes.STRING,
			},
			given_name: {
				type: DataTypes.STRING,
			},
			nationality: {
				type: DataTypes.STRING,
			},
			occupation: {
				type: DataTypes.STRING,
			},
			age: {
				type: DataTypes.INTEGER,
			},
			valid: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			token: DataTypes.STRING,
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
		await queryInterface.dropTable('Users');
	},
};
