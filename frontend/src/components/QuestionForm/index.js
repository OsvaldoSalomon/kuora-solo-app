import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { writeQuestion } from '../../store/questions';
import './QuestionForm.css';

const QuestionForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const updateTitle = (e) => setTitle(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			ownerId: sessionUser.id,
			title,
		};

		console.log(payload);

		dispatch(writeQuestion(payload));
		reset();
	};

	const reset = () => {
		setTitle('');
	};

	return (
		<section className="questionForm">
			<form onSubmit={handleSubmit}>
				<div className="formContainer">
					<input
						className="questionInput"
						type="text"
						placeholder="What do you want to ask or share?"
						required
						value={title}
						onChange={updateTitle}
					/>
					<button className="questionButton" type="submit">
						Add Question
					</button>
				</div>
			</form>
		</section>
	);
};

export default QuestionForm;
