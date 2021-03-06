import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_QUESTIONS = 'questions/getAllQuestions';
const ADD_QUESTION = 'questions/addQuestion';
const EDIT_QUESTION = 'questions/editQuestion';
const REMOVE_QUESTION = 'questions/removeQuestion';

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

export const editQuestion = (question) => {
	return {
		type: EDIT_QUESTION,
		question,
	};
};

export const removeQuestion = (question) => {
	return {
		type: REMOVE_QUESTION,
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

export const updateQuestion = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/questions/${payload.id}/edit`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const updatedQuestion = await response.json();
		dispatch(editQuestion(updatedQuestion));
		return updatedQuestion;
	}
};

export const deleteQuestion = (payloadId) => async (dispatch) => {
	const response = await csrfFetch(`/api/questions/${payloadId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const deletedQuestion = await response.json();
		dispatch(removeQuestion(deletedQuestion));
		return deletedQuestion;
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
			return newState;
		}
		case ADD_QUESTION:
			return { ...state, [action.question.id]: action.question };
		case EDIT_QUESTION:
			return { ...state, [action.question.id]: action.question };
		case REMOVE_QUESTION:
			const newState = { ...state };
			delete newState[action.question.id];
			return newState;
		default:
			return state;
	}
};

export default questionsReducer;
