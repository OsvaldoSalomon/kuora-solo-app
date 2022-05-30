import { csrfFetch } from './csrf';

// constant to avoid debugging typos
const GET_ALL_QUESTIONS = 'questions/getAllQuestions';

//regular action creator
const loadQuestions = (questions) => {
	return {
		type: GET_ALL_QUESTIONS,
		questions,
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
		default:
			return state;
	}
};

export default questionsReducer;
