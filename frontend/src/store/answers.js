import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_ANSWERS = 'questions/getAllAnswers';
const ADD_ANSWER = 'questions/addAnswer';

//regular action creator
export const loadAnswers = (answers) => {
	return {
		type: GET_ALL_ANSWERS,
		answers,
	};
};

export const addAnswer = (answer) => {
	return {
		type: ADD_ANSWER,
		answer,
	};
};

// thunk action creator
export const getAllAnswers = () => async (dispatch) => {
	const response = await csrfFetch('/api/answers');

	if (response.ok) {
		const data = await response.json();
		dispatch(loadAnswers(data));
		return data;
	}
};

export const writeAnswer = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/answers/new', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const newAnswer = await response.json();
		dispatch(addAnswer(newAnswer));
		return newAnswer;
	}
};

// state object
const initialState = {};

// reducer
const answersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ANSWERS: {
			const newState = {};
			action.answers.forEach(
				(answer) => (newState[answer.id] = answer)
			);
			return newState;
		}
		case ADD_ANSWER:
			console.log('this is the answer action', action);
			return { ...state, [action.answer.id]: action.answer };
		default:
			return state;
	}
};

export default answersReducer;
