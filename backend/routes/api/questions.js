const express = require('express');
const asyncHandler = require('express-async-handler');
const { validateCreate } = require('../validations/questions');
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

router.post(
	'/new',
	validateCreate,
	asyncHandler(async (req, res) => {
		const question = await Question.create(req.body);
		res.json(question);
	})
);

module.exports = router;
