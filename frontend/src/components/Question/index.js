import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion } from '../../store/questions';
import { useState } from 'react';
import QuestionEditForm from '../QuestionEditForm';
import './Question.css';

const Question = ({ question }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [showEditForm, setShowEditForm] = useState(false);

	const handleEditButton = () => {
		setShowEditForm(!showEditForm);
	};

	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return (
		<div className="textContainer">
			<div className="questionHeader">
				<div>
					<h3 className="questionAuthor">{question.author.username}</h3>
					<p className="questionDate">
						{new Date(question.createdAt).toLocaleDateString(
							undefined,
							options
						)}
					</p>
				</div>
				{sessionUser.id === question.author.id ? (
					<div className="buttonsEditDelete">
						<button
							className="deleteBtn"
							onClick={() => dispatch(deleteQuestion(question.id))}
						>
							<i className="fas fa-trash-alt"></i>
						</button>
						<button className="editBtn" onClick={handleEditButton}>
							<i className="fas fa-edit"></i>
						</button>
					</div>
				) : (
					<span></span>
				)}
			</div>
			{showEditForm ? (
				<QuestionEditForm
					question={question}
					hideForm={() => setShowEditForm(false)}
				/>
			) : (
				<span></span>
			)}
			<h2 className="questionTitle">{question.title}</h2>
		</div>
	);
};

export default Question;
