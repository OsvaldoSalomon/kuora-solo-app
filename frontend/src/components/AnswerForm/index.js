import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { writeAnswer } from '../../store/answers';
import './AnswerForm.css';

const AnswerForm = ({ questionId }) => {
	const dispatch = useDispatch();
	const [answer, setAnswer] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const [addImage, setAddImage] = useState(false);
	const [errors, setErrors] = useState([]);
	const updateAnswer = (e) => setAnswer(e.target.value);
	const updateImgUrl = (e) => setImgUrl(e.target.value);
	const sessionUser = useSelector((state) => state.session.user);

	const handleAddImage = () => {
		setAddImage(!addImage);
	};

	const reset = () => {
		setAnswer('');
		setImgUrl('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = {
			userId: sessionUser.id,
			answer,
			imgUrl,
			questionId,
		};
		dispatch(writeAnswer(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
		reset();
	};

	return (
		<section className="answerForm">
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li className="errors" key={idx}>
							{error}
						</li>
					))}
				</ul>
				<textarea
					className="answerInput"
					type="text"
					placeholder="Answer Question"
					required
					value={answer}
					onChange={updateAnswer}
				/>
				{addImage && (
					<input
						className="imageInput"
						type="text"
						placeholder="Add an image URL"
						value={imgUrl}
						onChange={updateImgUrl}
					/>
				)}
				<button className="submitAnswerButton" type="button" onClick={handleAddImage}>
					Add image URL
				</button>

				<button className="submitAnswerButton" type="submit">
					Add Answer
				</button>
			</form>
		</section>
	);
};

export default AnswerForm;
