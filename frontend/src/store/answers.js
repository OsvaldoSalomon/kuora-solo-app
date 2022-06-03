import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_ANSWERS = 'answers/getAllAnswers';
const ADD_ANSWER = 'answers/addAnswer';
const EDIT_ANSWER = 'answers/editAnswer';
const REMOVE_ANSWER = 'answers/removeAnswer';

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

export const editAnswer = (answer) => {
	return {
		type: EDIT_ANSWER,
		answer,
	};
};

export const removeAnswer = (answer) => {
	return {
		type: REMOVE_ANSWER,
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

export const updateAnswer = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/answers/${payload.id}/edit`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const updatedAnswer = await response.json();
		dispatch(editAnswer(updatedAnswer));
		return updatedAnswer;
	}
};

export const deleteAnswer = (payloadId) => async (dispatch) => {
	const response = await csrfFetch(`/api/answers/${payloadId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const deletedAnswer = await response.json();
		dispatch(removeAnswer(deletedAnswer));
		return deletedAnswer;
	}
};

// state object
const initialState = {};

// reducer
const answersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ANSWERS: {
			const newState = {};
			action.answers.forEach((answer) => (newState[answer.id] = answer));
			return newState;
		}
		case ADD_ANSWER:
			return { ...state, [action.answer.id]: action.answer };
		case EDIT_ANSWER:
			// console.log('this is the answer action', action);
			return { ...state, [action.answer.id]: action.answer };
		case REMOVE_ANSWER: {
			const newState = { ...state };
			delete newState[action.answer.id];
			return newState;
		}
		default:
			return state;
	}
};

export default answersReducer;
