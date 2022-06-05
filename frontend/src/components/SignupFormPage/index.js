import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';
import * as sessionActions from '../../store/session';

function SignupFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({ email, username, password })
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field',
		]);
	};

	return (
		<div className="signupContainer">
			<form className="signUpForm" onSubmit={handleSubmit}>
				<h1>Welcome</h1>
				<ul>
					{errors.map((error, idx) => (
						<li className="errors" key={idx}>
							{error}
						</li>
					))}
				</ul>
				<div>
					<input
						className="inputBox"
						placeholder="Email"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						className="inputBox"
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						className="inputBox"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						className="inputBox"
						placeholder="Confirm Password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button className="signupButton" type="submit">
					Sign Up
				</button>
				<p>
					Already have an account?{' '}
					<a className="linkLogin" href="/login">
						Login
					</a>
				</p>
			</form>
		</div>
	);
}

export default SignupFormPage;
