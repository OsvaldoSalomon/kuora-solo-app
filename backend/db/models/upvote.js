'use strict';
module.exports = (sequelize, DataTypes) => {
	const Upvote = sequelize.define(
		'Upvote',
		{
			userId: DataTypes.INTEGER,
			questionId: DataTypes.INTEGER,
		},
		{}
	);
	Upvote.associate = function (models) {
		Upvote.belongsTo(models.User, { foreignKey: 'userId' });
		Upvote.belongsTo(models.Question, { foreignKey: 'questionId' });
	};
	return Upvote;
};
