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
				<NavLink className="linkQuestions" to="/questions">
					Start Asking
				</NavLink>
				<ProfileButton user={sessionUser} />
			</>
		);
	} else {
		sessionLinks = (
			<div>
				<NavLink className="authLink" to="/login">
					Log In
				</NavLink>
				<NavLink className="authLink" to="/signup">
					Sign Up
				</NavLink>
			</div>
		);
	}

	return (
		<div className="navBar">
			<div className="navLinks">
				<NavLink className="logoLink" exact to="/">
					<div className="logo">Kuora</div>
				</NavLink>
				{isLoaded && sessionLinks}
			</div>
		</div>
	);
}

export default Navigation;
