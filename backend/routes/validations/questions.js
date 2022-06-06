const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const title = check('title')
	.exists({ checkFalsy: true })
	.isLength({ min: 3, max: 80 })
	.withMessage(
		'Please provide a value for the title between 3 and 80 characters'
	);

exports.validateCreate = [title, handleValidationErrors];
