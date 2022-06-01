const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const answer = check('answer')
	.notEmpty()
	.withMessage('Please provide a value for the answer');

exports.validateCreate = [answer, handleValidationErrors];
