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
			<div>
				<div>
					<button>
						<a href="postQuestion">
							<i className="fas fa-pen" />
						</a>
					</button>
				</div>
				<div>
					<NavLink to="/questions">Questions</NavLink>
				</div>
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			</div>
		);
	} else {
		sessionLinks = (
			<>
				<NavLink to="/login">Log In</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		);
	}

	return (
		<ul className="navBar">
			<li>
				<NavLink exact to="/">
					<div className="logo">Kuora</div>
				</NavLink>
				{isLoaded && sessionLinks}
			</li>
		</ul>
	);
}

export default Navigation;
