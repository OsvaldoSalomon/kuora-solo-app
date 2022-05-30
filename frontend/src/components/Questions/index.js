import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllQuestions } from '../../store/questions';

const QuestionsList = () => {
	const dispatch = useDispatch();
	const questionList = useSelector((state) => Object.values(state.questions));
	// console.log(questionList);

	useEffect(() => {
		dispatch(getAllQuestions());
	}, [dispatch]);

	return (
		<>
			<h1>All Questions</h1>

			{questionList?.map((question) => {
				return (
					<div key={question.id}>
						<h2>{question.title}</h2>
                        <p>{question.author.username}</p>
						<p>{question.description}</p>
						<img src={question.imgUrl} alt={question.title} />
					</div>
				);
			})}
		</>
	);
};

export default QuestionsList;
