'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Group, User_Group }) {
			// define association here
			this.belongsToMany(Group, {
				through: User_Group,
				as: 'groups',
				foreignKey: 'user_id',
			});
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
				password: undefined,
				token: undefined,
			};
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				unique: true,
				primaryKey: true,
				allowNull: false,
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
			username: DataTypes.STRING,
			family_name: DataTypes.STRING,
			given_name: DataTypes.STRING,
			nationality: DataTypes.STRING,
			occupation: DataTypes.STRING,
			profile_image: {
				type: DataTypes.STRING,
				defaultValue:
					'https://res.cloudinary.com/demo/image/upload/v1570979139/eneivicys42bq5f2jpn2.jpg',
			},
			age: DataTypes.INTEGER,
			valid: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			token: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
		},
	);
	return User;
};
