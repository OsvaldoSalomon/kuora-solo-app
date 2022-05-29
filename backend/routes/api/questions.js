const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Question } = require('../../db/models');
const { User } = require('../../db/models');
const { Answer } = require('../../db/models');
const { Upvote } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const questions = await Question.findAll({
			include: {
				model: User,
				as: 'author',
			},
		});
		return res.json(questions);
	})
);

router.get(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const questionId = req.params.id;
		const question = await Question.findByPk(questionId, {
			include: [
				{
					model: User,
					as: 'author',
				},
				{
					model: Answer,
					include: User,
				},
				{
					model: Upvote,
				},
			],
		});
		return res.json(question);
	})
);

module.exports = router;
