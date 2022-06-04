import './Home.css';

const Home = () => {
	return (
		<div className="splashPage">
			<h1 className="welcome">
				Welcome to <span className="letterLogo">Kuora</span>
			</h1>
			<h2 className="mantra">
				Ask whatever you want.
				<br />
				Discover questions and answers.
				<br />
				Share your knowledge.
			</h2>
			<div className="splashImage">
				<img
					className="imageSplash"
					src="https://images.unsplash.com/photo-1588594276800-2de0522b3b73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
				/>
			</div>
		</div>
	);
};

export default Home;
