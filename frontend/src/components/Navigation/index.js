import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
				<li>
					<NavLink className="linkQuestions" to="/questions">
						Start Asking
					</NavLink>
				</li>
			</>
		);
	} else {
		sessionLinks = (
			<>
				<NavLink className="authLink" to="/login">
					Log In
				</NavLink>
				<NavLink className="authLink" to="/signup">
					Sign Up
				</NavLink>
			</>
		);
	}

	return (
		<div className="navBar">
			<ul className="navLinks">
				<li>
					<NavLink className="logoLink" exact to="/">
						<div className="logo">Kuora</div>
					</NavLink>
				</li>
				<li>{isLoaded && sessionLinks}</li>
			</ul>
		</div>
	);
}

export default Navigation;
