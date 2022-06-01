'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Answers',
			[
				{
					answer: 'Wow! Good to know',
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
				{
					answer: 'Good answer',
					userId: 3,
					questionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: 'That is impressive',
					userId: 3,
					questionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: 'I had no idea',
					userId: 4,
					questionId: 4,
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
