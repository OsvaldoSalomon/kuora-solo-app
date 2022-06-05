import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../store/questions';
import { getAllAnswers } from '../../store/answers';
import Question from '../Question';
import Answer from '../Answer';
import QuestionForm from '../QuestionForm';
import AnswerForm from '../AnswerForm';
import './QuestionList.css';

const QuestionsList = () => {
	const dispatch = useDispatch();
	const [showAnswerForm, setShowAnswerForm] = useState(false);
	const questionList = useSelector((state) => Object.values(state.questions));
	const answers = useSelector((state) => Object.values(state.answers));
	const sortedQuestions = questionList
		.sort((a, b) => {
			return new Date(a.createdAt - b.createdAt);
		})
		.reverse();

	useEffect(() => {
		dispatch(getAllQuestions());
		dispatch(getAllAnswers());
	}, [dispatch]);

	const handleShowAnswerForm = (id) => {
		setShowAnswerForm(id);
	};

	return (
		<div>
			<QuestionForm id="postQuestion" />
			<div className="questionList">
				{sortedQuestions?.map((question) => {
					return (
						<div className="question" key={question.id}>
							<Question question={question} />
							<hr />
							<div className="answersContainer">
								<button
									className="showAnswerForm"
									onClick={() => handleShowAnswerForm(question.id)}
								>
									Answer Question
								</button>
								{showAnswerForm === question.id && <AnswerForm questionId={question.id} />}
								{answers?.map((answer) => {
									if (answer.questionId === question.id) {
										return <Answer key={answer.id} answer={answer} />;
									}
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
