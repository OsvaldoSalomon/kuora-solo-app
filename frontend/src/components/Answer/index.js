import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../store/answers';
import './Answer.css'

const Answer = ({ answer }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div key={answer.id} className="answer">
			<div className="answerInfo">
				<p className="answerAuthor">{answer.User.username}</p>
				<p className="answerDate">
					{new Date(answer.createdAt).toLocaleDateString()}
				</p>
				{sessionUser.id === answer.User.id ? (
					<div className="buttonsEditDelete">
						<button onClick={() => dispatch(deleteAnswer(answer.id))}>
							Delete
						</button>
						<button>Edit</button>
					</div>
				) : (
					<span></span>
				)}
			</div>
			<p className="answerText">{answer.answer}</p>
			<div className="imgContainer">
				<img className="questionImg" src={answer.imgUrl} alt={answer.title} />
			</div>
		</div>
	);
};

export default Answer;
