import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../store/questions';
import './Questions.css';

const QuestionsList = () => {
	const dispatch = useDispatch();
	const questionList = useSelector((state) => Object.values(state.questions));
	console.log(questionList);
	// console.log('Comments', questionList.map(question => question.answer));
	// console.log(questionList[0].Answers[0].answer);
	console.log(questionList.map(question => console.log(question.Answers)))
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	useEffect(() => {
		dispatch(getAllQuestions());
	}, [dispatch]);

	return (
		<div className="questionList">
			{questionList?.map((question) => {
				return (
					<div className="question" key={question.id}>
						<div className="textContainer">
							<p className="questionAuthor">
								{question.author.username}
							</p>
							<p className="questionDate">
								{new Date(
									question.createdAt
								).toLocaleDateString(undefined, options)}
							</p>
							<h2 className="questionTitle">{question.title}</h2>
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
						<div className="commentsContainer">
							{/* questionList[0].Answers[0].answer */}
							{/* <p>{questionList[0].Answers[0].answer}</p> */}
							{/* {questionList?.Answers.map(answer => {
								return (
									<p>{answer.answer}</p>
								)
							})} */}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default QuestionsList;
