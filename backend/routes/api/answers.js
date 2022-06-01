const express = require('express');
const asyncHandler = require('express-async-handler');
const { validateCreate } = require('../validations/questions');
const { User } = require('../../db/models');
const { Answer } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const answers = await Answer.findAll({
			include: [
				{
					model: User,
					as: 'author',
				},
			],
		});
		return res.json(answers);
	})
);

router.post(
	'/',
	validateCreate,
	asyncHandler(async (req, res) => {
		const answer = await Answer.create(req.body);
		res.json(answer);
	})
);


module.exports = router;
