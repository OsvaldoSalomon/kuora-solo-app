const express = require('express');
const asyncHandler = require('express-async-handler');
const { validateCreate } = require('../validations/answers');
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
				},
			],
		});
		return res.json(answers);
	})
);

router.get(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const answerId = req.params.id;
		const answer = await Answer.findByPk(answerId, {
			include: [
				{
					model: User,
				},
			],
		});
		return res.json(answer);
	})
);

router.post(
	'/new',
	validateCreate,
	asyncHandler(async (req, res) => {
		const answer = await Answer.create(req.body);
		const returnAnswer = await Answer.findByPk(answer.id, {
			include: [
				{
					model: User,
				},
			],
		});
		res.json(returnAnswer);
	})
);

router.put(
	'/:id(\\d+)/edit',
	validateCreate,
	asyncHandler(async (req, res) => {
		const answer = await Answer.findByPk(req.params.id);

		answer.answer = req.body.answer;
		answer.imgUrl = req.body.imgUrl;
		await answer.save();

		const returnAnswer = await Answer.findByPk(answer.id, {
			include: [
				{
					model: User,
				},
			],
		});
		res.json(returnAnswer);
	})
);

router.delete(
	'/:id(\\d+)',
	asyncHandler(async (req, res) => {
		const answer = await Answer.findByPk(req.params.id);
		if (answer) {
			await Answer.destroy({ where: { id: answer.id } });
			res.json(answer);
		}
	})
);

module.exports = router;
