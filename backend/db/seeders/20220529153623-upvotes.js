'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Upvotes',
			[
				{
					userId: 1,
					questionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
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
		return queryInterface.bulkDelete('Upvotes', null, {});
	},
};
