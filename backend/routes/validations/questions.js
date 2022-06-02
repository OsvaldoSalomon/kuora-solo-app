const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const title = check('title')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the title');


exports.validateCreate = [title, handleValidationErrors];
