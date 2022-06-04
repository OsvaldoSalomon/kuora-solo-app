import './Home.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return (
		<div className="splashPage">
			<div className="introLetters">
				<h1 className="welcome">Welcome to Kuora</h1>
				<h2>
					Ask whatever you want.
					<br />
					Discover questions and answers.
					<br />
					Share your knowledge.
				</h2>
			</div>
			<div className="splashImage">
				<img className="imageSplash" src="https://images.unsplash.com/photo-1652932420117-0055d554e60f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80" />
			</div>
		</div>
	);
};

export default Home;
