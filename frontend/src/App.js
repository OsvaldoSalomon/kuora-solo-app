import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Home from './components/Home';
import SignupFormPage from './components/SignupFormPage';
import QuestionsList from './components/QuestionList';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/login">
						<LoginFormPage />
					</Route>
					<Route path="/signup">
						<SignupFormPage />
					</Route>
					<Route exact path="/questions">
						<QuestionsList />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
