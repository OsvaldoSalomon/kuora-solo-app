import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_QUESTIONS = 'questions/getAllQuestions';
const ADD_QUESTION = 'questions/addQuestion';

//regular action creator
export const loadQuestions = (questions) => {
	return {
		type: GET_ALL_QUESTIONS,
		questions,
	};
};

export const addQuestion = (question) => {
	return {
		type: ADD_QUESTION,
		question,
	};
};

// thunk action creator
export const getAllQuestions = () => async (dispatch) => {
	const response = await csrfFetch('/api/questions');

	if (response.ok) {
		const data = await response.json();

		dispatch(loadQuestions(data));
		return data;
	}
};

export const writeQuestion = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/questions/new', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const newQuestion = await response.json();
		dispatch(addQuestion(newQuestion));
		return newQuestion;
	}
};

// state object
const initialState = {};

// reducer
const questionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_QUESTIONS: {
			const newState = {};
			action.questions.forEach(
				(question) => (newState[question.id] = question)
			);
			console.log('this is the action', action);
			console.log('this is the newState', newState);
			return newState;
		}
		case ADD_QUESTION:
			console.log('this is the action', action);
			return { ...state, [action.question.id]: action.question };
		default:
			return state;
	}
};

export default questionsReducer;
