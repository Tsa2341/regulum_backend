const { Model } = require('sequelize');
const { randoms } = require('../../utils/enum.utils');

module.exports = (sequelize, DataTypes) => {
	class Random extends Model {
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
				createdAt: undefined,
				updatedAt: undefined,
			};
		}
	}
	Random.init(
		{
			name: {
				type: DataTypes.ENUM,
				values: randoms,
			},
			value: DataTypes.TEXT('medium'),
		},
		{
			sequelize,
			modelName: 'Random',
		},
	);
	return Random;
};
