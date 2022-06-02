import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_ANSWERS = 'questions/getAllAnswers';
const ADD_ANSWER = 'questions/addAnswer';
const EDIT_ANSWER = 'questions/editAnswer';
const REMOVE_ANSWER = 'questions/removeAnswer';

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
		dispatch(updateAnswer(updatedAnswer));
		return updatedAnswer;
	}
};

export const deleteAnswer = (payloadId) => async (dispatch) => {
	const response = await csrfFetch(`/api/answers/${payloadId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const { id: deleteAnswerId } = await response.json();
		dispatch(removeAnswer(deleteAnswerId));
		return deleteAnswerId;
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
		case EDIT_ANSWER:
			// console.log('this is the answer action', action);
			return { ...state, [action.answer.id]: action.answer };
		case REMOVE_ANSWER: {
			console.log('this is the answer action ', action);
			const newState = { ...state };
			console.log('this is the newState', newState);
			delete newState[action.payloadId];
			console.log('this is the modified state', newState);
			return newState;
			// return state.filter(({id}) => id !== action.answer.answerId)
		}
		default:
			return state;
	}
};

export default answersReducer;
