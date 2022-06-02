'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Questions',
			[
				{
					title: 'Why does Steven have his own version of the suit in Moon Knight?',
					ownerId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'When did Palpatine realize that Anakin would be a Sith Lord?',
					ownerId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'What if Qui-Gon finished his Force ghost training?',
					ownerId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					title: 'Would the TVA be capable of arresting the Ancient One?',
					ownerId: 3,
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
