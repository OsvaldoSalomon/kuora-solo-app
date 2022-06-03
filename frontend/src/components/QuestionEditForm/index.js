import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestion } from '../../store/questions';
import './QuestionEditForm.css';

const QuestionEditForm = ({ question, hideForm }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState(question.title);
	const updateTitle = (e) => setTitle(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			id: question.id,
			ownerId: sessionUser.id,
			title,
		};

		console.log('PAYLOAD', payload);

		dispatch(updateQuestion(payload));
		reset();
		hideForm();
	};

	const reset = () => {
		setTitle('');
	};

	return (
		<section className="questionEditForm">
			<form onSubmit={handleSubmit}>
				<div className="formContainer">
					<input
						className="questionEditInput"
						type="text"
						placeholder="What do you want to ask or share?"
						required
						value={title}
						onChange={updateTitle}
					/>
					<div className='buttonGroup'>
						<button className="questionEditButton" type="submit">
							Edit
						</button>
						<button
							type="button"
							onClick={hideForm}
							className="cancelEditButton"
						>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

export default QuestionEditForm;
