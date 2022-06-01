import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../store/questions';
import QuestionForm from '../QuestionForm';
import './Questions.css';

const QuestionsList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllQuestions());
	}, [dispatch]);
	const questionList = useSelector((state) => Object.values(state.questions));
	// console.log(questionList);
	// console.log(
	// 	questionList.map((question) => console.log(question.Answers[0]))
	// );
	// console.log(questionList.map(question => console.log(question.Answers[0].User.username)));
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return (
		<div>
			<QuestionForm  />
			<div className="questionList">
				{questionList?.map((question) => {
					return (
						<div className="question" key={question.id}>
							<div className="textContainer">
								<h3 className="questionAuthor">
									{question.author.username}
								</h3>
								<p className="questionDate">
									{new Date(
										question.createdAt
									).toLocaleDateString(undefined, options)}
								</p>
								<h2 className="questionTitle">
									{question.title}
								</h2>
								<p className="questionDescription">
									{question.description}
								</p>
							</div>
							<div className="imgContainer">
								<img
									className="questionImg"
									src={question.imgUrl}
									alt={question.title}
								/>
							</div>
							<div className="upvotesContainer">
								<p>Upvotes: {question?.Upvotes.length}</p>
							</div>
							<hr />
							<div className="commentsContainer">
								{question?.Answers.map((answer) => {
									return (
										<div
											key={answer.id}
											className="comment"
										>
											<div className="commentInfo">
												<p className="commentAuthor">
													{answer.User.username}
												</p>
												<p className="commentDate">
													{new Date(
														answer.createdAt
													).toLocaleDateString()}
												</p>
											</div>
											<p className="commentAnswer">
												{answer.answer}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionsList;
