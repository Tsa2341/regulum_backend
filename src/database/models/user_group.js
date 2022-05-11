'use strict';
const { Model } = require('sequelize');
const { userGroupRoles } = require('../../utils/enum.utils');

module.exports = (sequelize, DataTypes) => {
	class User_Group extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
			};
		}
	}
	User_Group.init(
		{
			group_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
			},
			user_role: {
				type: DataTypes.ENUM,
				values: userGroupRoles,
				defaultValue: 'MEMBER',
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User_Group',
		},
	);
	return User_Group;
};
