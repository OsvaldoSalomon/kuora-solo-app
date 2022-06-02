import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion } from '../../store/questions';
import './Question.css'

const Question = ({ question }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

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
						<button onClick={() => dispatch(deleteQuestion(question.id))}>
							Delete
						</button>
						<button>Edit</button>
					</div>
				) : (
					<span></span>
				)}
			</div>
			<h2 className="questionTitle">{question.title}</h2>
		</div>
	);
};

export default Question;
