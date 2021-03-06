'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			'Answers',
			[
				{
					answer: `In Marvel Comics, Moon Knight has four personalities to match the four faces of the moon. Mr. Knight (as he's known) is one of the those faces. He has Mark Spector's personality and controlled by him. But he has the powers of the Fist of Khonshu. Mr.Knight is usually the official representative of the vigilante, consulting with the police about crime scenes and talking to people in need of protection.`,
					imgUrl: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/moon_knight_2010_1_intro_image.jpg',
					userId: 2,
					questionId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: `I don't know about Sith Lord, but we know when Palpatine really began to take an interest in Anakin. At this moment here he sees a young Anakin doing some training. Anakin is impressive, but the moment that really captures his attention is when Anakin gets pissed off and uses the sabers of the other students against them. That flash of anger and action is what leads Palpatine to start actively pursuing and manipulating Anakin.`,
					imgUrl: 'https://qph.cf2.quoracdn.net/main-qimg-419db26a21f3077a5e864ade5e267fdc-lq',
					userId: 1,
					questionId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: `Qui-Gon learned the ability to become a Force ghost from the Shaman of the Whills. However, he died prematurely at the hands of Darth Maul, so the training was incomplete. As a result, he couldn't live on as a perfected Force ghost. If he had finished his training, then Qui-Gon would've been able to appear to the living with a physical manifestation as well, instead of just being a bodiless voice.`,
					imgUrl: 'https://qph.cf2.quoracdn.net/main-qimg-d711e5444e012982b846f0bdf1e9791d-pjlq',
					userId: 4,
					questionId: 3,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					answer: `The Ancient One was Sorcerer Supreme, the contest would have been tough. But eventually TVA would have to find a way to capture her. But before we even get to see this contest, I don't think The Ancient One would ever do something to trigger a nexus event. Remember, TVA prunes only beings who cause a nexus event. The Ancient One always knew of The Multiverse and The Sacred Timeline. It's hard to say if she knew that about TVA and Kang. But she would never do anything to cause an anomaly.`,
					imgUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/05/Tilda-Swinton-as-the-Ancient-One-in-Doctor-Strange.jpg',
					userId: 1,
					questionId: 4,
					createdAt: new Date(),
					updatedAt: new Date(),
				}
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Answers', null, {});
	},
};
