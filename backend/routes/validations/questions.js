const { check } = require('express-validator');
const { handleValidationErrors } = require('./utils');

const title = check('title')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the title');

const description = check('description')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the description');

const imgUrl = check('imgUrl')
	.exists({ checkFalsy: true })
	.withMessage('Please provide a value for the imgUrl');

exports.validateCreate = [title, description, imgUrl, handleValidationErrors];
