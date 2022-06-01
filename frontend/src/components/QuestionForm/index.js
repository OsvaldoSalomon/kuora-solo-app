import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { writeQuestion } from '../../store/questions';
import './QuestionForm.css';

const QuestionForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [question, setQuestion] = useState('');
	const [description, setDescription] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const updateQuestion = (e) => setQuestion(e.target.value);
	const updateDescription = (e) => setDescription(e.target.value);
	const updateImageUrl = (e) => setImgUrl(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);
	// console.log(sessionUser.id)

	const handleSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			ownerId: sessionUser.id,
			question,
			description,
			imgUrl,
		};

		console.log(payload);

		// let newQuestion = await dispatch(writeQuestion(payload));
		dispatch(writeQuestion(payload));
		// if (newQuestion) {
		// 	history.push('/questions');
		// }
		reset();
	};

	const reset = () => {
		setQuestion('');
		setDescription('');
		setImgUrl('');
	};

	return (
		<section className="questionForm">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="What do you want to ask or share?"
					required
					value={question}
					onChange={updateQuestion}
				/>
				<input
					type="text"
					placeholder="Add a Description"
					required
					value={description}
					onChange={updateDescription}
				/>
				<input
					type="text"
					placeholder="Add an Image URL"
					value={imgUrl}
					onChange={updateImageUrl}
				/>
				<button type="submit">Add Question</button>
			</form>
		</section>
	);
};

export default QuestionForm;
