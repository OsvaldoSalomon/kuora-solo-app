const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const answer = check('answer')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the answer');
const userId = check('userId')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the userId');
const questionId = check('questionId')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the questionId');

exports.validateCreate = [answer, userId, questionId, handleValidationErrors];
