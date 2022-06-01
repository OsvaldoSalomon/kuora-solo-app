const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { Question } = require('../../db/models');
const { User } = require('../../db/models');
const { Answer } = require('../../db/models');
const { Upvote } = require('../../db/models');

const router = express.Router();

router.get(
	'/',
	asyncHandler(async (req, res) => {
		const questions = await Question.findAll({
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

const questionValidators = [
	check('title')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a value for the title'),
	check('description')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a value for the description'),
	check('imgUrl')
		.exists({ checkFalsy: true })
		.withMessage('Please provide a value for the imgUrl'),
];

router.post(
	'/new',
	questionValidators,
	asyncHandler(async (req, res) => {
		const { title, description, imgUrl } = req.body;

		const { ownerId } = req.session.auth;

		const question = Question.build({
			title,
			description,
			imgUrl,
			ownerId,
		});

		const validatorErrors = validationResult(req);

		if (validatorErrors.isEmpty()) {
			await question.save();
			res.redirect('/questions');
		} else {
			const errors = validatorErrors.array().map((error) => error.msg);
		}
	})
);

module.exports = router;
