'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Questions',
			[
				{
					title: 'Question 1',
					description:
						'Some text',
					imgUrl: 'https://i0.wp.com/bdtechtalks.com/wp-content/uploads/2022/02/algorithm-formulation.jpg?ssl=1',
					ownerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Question 2',
					description:
						'Some text',
					imgUrl: 'https://outreachmagazine.com/wp-content/uploads/2020/08/20_0903_LEADERSHIP_Answering-the-Question-Behind-the-Question-People-Ask-You_1021x640.jpg',
					ownerId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Questions', null, {});
	},
};
