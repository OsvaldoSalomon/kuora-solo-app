import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnswer } from '../../store/answers';
import './AnswerEditForm.css';

const AnswerEditForm = ({ answer, hideForm }) => {
	const dispatch = useDispatch();
	const [answerInput, setAnswerInput] = useState(answer.answer);
	const [imgUrl, setImgUrl] = useState(answer.imgUrl);

	const updateAnswerInput = (e) => setAnswerInput(e.target.value);
	const updateImgUrl = (e) => setImgUrl(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			id: answer.id,
			userId: sessionUser.id,
			answer: answerInput,
			imgUrl,
			questionId: answer.questionId,
		};

		console.log(payload);

		dispatch(updateAnswer(payload));
		reset();
		hideForm();
	};

	const reset = () => {
		setAnswerInput('');
		setImgUrl('');
	};

	return (
		<section className="answerEditForm">
			<form onSubmit={handleSubmit}>
				<textarea
					className="answerEditInput"
					type="text"
					placeholder="Answer Question"
					required
					value={answerInput}
					onChange={updateAnswerInput}
				/>
				<input
					className="imageEditInput"
					type="text"
					placeholder="Add an image URL"
					required
					value={imgUrl}
					onChange={updateImgUrl}
				/>
				<div className="buttonGroup">
					<button className="editAnswerButton" type="submit">
						Edit
					</button>
					<button className="cancelEditAnswerButton" type="button" onClick={hideForm} >
						Cancel
					</button>
				</div>
			</form>
		</section>
	);
};

export default AnswerEditForm;
