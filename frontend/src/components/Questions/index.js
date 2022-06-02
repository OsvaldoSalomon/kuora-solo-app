import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import QuestionForm from '../QuestionForm';
import AnswerForm from '../AnswerForm';
import './Questions.css';

const QuestionsList = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllQuestions());
		dispatch(getAllAnswers());
	}, [dispatch]);
	const questionList = useSelector((state) => Object.values(state.questions));
	const answers = useSelector((state) => Object.values(state.answers));
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
			<QuestionForm />
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
							</div>
							<hr />
							<div className="answersContainer">
								<AnswerForm questionId={question.id} />
								{answers?.map((answer) => {
									if (answer.questionId === question.id) {
										return (
											<div
												key={answer.id}
												className="answer"
											>
												<div className="answerInfo">
													<p className="answerAuthor">
														{answer.User.username}
													</p>
													<p className="answerDate">
														{new Date(
															answer.createdAt
														).toLocaleDateString()}
													</p>
												</div>
												<p className="answerText">
													{answer.answer}
												</p>
												<div className="imgContainer">
													<img
														className="questionImg"
														src={answer.imgUrl}
														alt={answer.title}
													/>
												</div>
											</div>
										);
									}
								})}
							</div>
							<div className="upvotesContainer">
								<p>Upvotes: {question?.Upvotes.length}</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuestionsList;
