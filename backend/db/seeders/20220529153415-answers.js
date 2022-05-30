'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Answers',
			[
				{
					answer: 'Nice!',
					userId: 1,
					questionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: 'Cool!',
					userId: 2,
					questionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Answers', null, {});
	},
};
