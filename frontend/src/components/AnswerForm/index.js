import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { writeAnswer } from '../../store/answers';
import './AnswerForm.css';

const AnswerForm = ({ questionId }) => {
	const dispatch = useDispatch();
	const [answer, setAnswer] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const updateAnswer = (e) => setAnswer(e.target.value);
	const updateImgUrl = (e) => setImgUrl(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			userId: sessionUser.id,
			answer,
			imgUrl,
			questionId,
		};

		console.log(payload);

		dispatch(writeAnswer(payload));
		reset();
	};

	const reset = () => {
		setAnswer('');
		setImgUrl('');
	};

	return (
		<section className="answerForm">
			<form onSubmit={handleSubmit}>
				<textarea
					className="answerInput"
					type="text"
					placeholder="Answer Question"
					required
					value={answer}
					onChange={updateAnswer}
				/>
				<input
					className="imageInput"
					type="text"
					placeholder="Add an image URL"
					required
					value={imgUrl}
					onChange={updateImgUrl}
				/>
				<button className="submitAnswerButton" type="submit">
					Add Answer
				</button>
			</form>
		</section>
	);
};

export default AnswerForm;
