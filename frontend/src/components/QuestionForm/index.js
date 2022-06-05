import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { writeQuestion } from '../../store/questions';
import './QuestionForm.css';

const QuestionForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState([]);
	const updateTitle = (e) => setTitle(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		if (title > 25) {
			setErrors('Title must be less than 25 characters');
		}
		const payload = {
			ownerId: sessionUser.id,
			title,
		};

		dispatch(writeQuestion(payload));
		reset();
	};

	const reset = () => {
		setTitle('');
	};

	return (
		<section className="questionForm">
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className="errors" key={idx}>
							{error}
						</li>
					))}
				</ul>
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
						<i className="fas fa-pen" />
					</button>
				</div>
			</form>
		</section>
	);
};

export default QuestionForm;
