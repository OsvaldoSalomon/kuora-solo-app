import { useDispatch, useSelector } from 'react-redux';
import { deleteAnswer } from '../../store/answers';
import './Answer.css';

const Answer = ({ answer }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div key={answer.id} className="answer">
			<div className="answerInfo">
				<div className="answerInfoAuthor">
					<p className="answerAuthor">{answer.User.username}</p>
					<p className="answerDate">
						{new Date(answer.createdAt).toLocaleDateString()}
					</p>
				</div>
				{sessionUser.id === answer.User.id ? (
					<div className="buttonsEditDelete">
						<button
							className="deleteBtn"
							onClick={() => dispatch(deleteAnswer(answer.id))}
						>
							<i class="fas fa-trash-alt"></i>
						</button>
						<button className="editBtn">
							<i class="fas fa-edit"></i>
						</button>
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
