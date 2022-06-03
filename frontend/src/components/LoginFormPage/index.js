import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/" />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<div className="loginContainer">
			<form className="loginForm" onSubmit={handleSubmit}>
				<h1>Welcome Back</h1>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div>
					<input
						className="inputBox"
						type="text"
						value={credential}
						placeholder="Username or Email"
						onChange={(e) => setCredential(e.target.value)}
						required
					/>
				</div>
				<div>
					<input
						className="inputBox"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button className="loginButton" type="submit">
					Log In
				</button>
				<p>
					Don't have an account? <a className='linkSignup' href="/signup">Sign Up</a>
				</p>
			</form>
		</div>
	);
}

export default LoginFormPage;
