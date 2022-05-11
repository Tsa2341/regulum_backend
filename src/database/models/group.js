const { Model } = require('sequelize');
const { accountTypes } = require('../../utils/enum.utils');

module.exports = (sequelize, DataTypes) => {
	class Group extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, User_Group }) {
			// define association here
			this.belongsToMany(User, {
				through: User_Group,
				as: 'users',
				foreignKey: 'group_id',
			});
		}

		toJSON() {
			return {
				...this.get(),
				id: undefined,
			};
		}
	}
	Group.init(
		{
			id: {
				type: DataTypes.UUID,
				unique: true,
				primaryKey: true,
				allowNull: false,
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
			goal: DataTypes.TEXT('large'),
			description: DataTypes.TEXT('large'),
			created_by: {
				type: DataTypes.UUID,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Group',
		},
	);
	return Group;
};
