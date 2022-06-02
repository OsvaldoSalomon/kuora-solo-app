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
		const returnQuestion = await Question.findByPk(question.id, {
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
		res.json(returnQuestion);
	})
);

router.put(
	'/:id(\\d+)/edit',
	asyncHandler(async (req, res) => {
		const question = await Question.findByPk(req.params.id);

		question.title = req.body.title;
		await question.save();

		const returnQuestion = await Question.findByPk(question.id, {
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
		res.json(returnQuestion);
	})
);

router.delete(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const questionId = req.params.id;
		const question = await Question.findByPk(questionId);
		const allAnswers = await Answer.findAll({
			where: { questionId },
		});

		const allUpvotes = await Upvote.findAll({
			where: { questionId },
		});

		for (let answer of allAnswers) {
			await answer.destroy();
		}

		for (let upvote of allUpvotes) {
			await upvote.destroy();
		}

		if (question) {
			await Question.destroy({ where: { id: question.id } });
			res.json(question);
		} 
	})
);

module.exports = router;
