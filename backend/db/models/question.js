'use strict';
module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define('Question', {
		ownerId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		imgUrl: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
	Question.associate = function (models) {
		const columnMapping = {
			through: 'Upvote',
			otherKey: 'userId',
			foreignKey: 'questionId',
			as: 'upvotes',
		};
		Question.belongsToMany(models.User, columnMapping);
		Question.belongsTo(models.User, {
			foreignKey: 'ownerId',
			as: 'author',
		});
		Question.hasMany(models.Answer, { foreignKey: 'questionId' });
		Question.hasMany(models.Upvote, { foreignKey: 'questionId' });
	};
	return Question;
};
