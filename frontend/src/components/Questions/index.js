import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getAllQuestions } from '../../store/questions';
import './Questions.css';

const QuestionsList = () => {
	const dispatch = useDispatch();
	const questionList = useSelector((state) => Object.values(state.questions));
	// console.log(questionList);

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
							<p className="questionDate">{question.createdAt}</p>
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
					</div>
				);
			})}
		</div>
	);
};

export default QuestionsList;
