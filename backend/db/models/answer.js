'use strict';
module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define(
		'Answer',
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			questionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			answer: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{}
	);
	Answer.associate = function (models) {
		Answer.belongsTo(models.Question, { foreignKey: 'questionId' });
		Answer.belongsTo(models.User, { foreignKey: 'userId' });
	};
	return Answer;
};
