'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					email: 'jim@hawkins.io',
					username: 'JHawkins',
					hashedPassword: bcrypt.hashSync('password2'),
				},
				{
					email: 'charlie@kelmeckis.io',
					username: 'CharlieK',
					hashedPassword: bcrypt.hashSync('password3'),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			'Users',
			{
				username: {
					[Op.in]: ['Demo-lition', 'JHawkins', 'CharlieK'],
				},
			},
			{}
		);
	},
};
