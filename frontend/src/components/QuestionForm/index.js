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

		dispatch(writeQuestion(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
		reset();
	};

	const reset = () => {
		setTitle('');
	};

	return (
		<section className="questionFormContainer">
			<form className="questionForm" onSubmit={handleSubmit}>
				<ul className="errorsList">
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
