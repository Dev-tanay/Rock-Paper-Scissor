const [ userHand, opponentHand, title, scoreLeft, scoreRight ] = ['#hand-left', '#hand-right', '#title', '#score-left', '#score-right']
	.map(selector => document.querySelector(selector));
const buttons = document.querySelectorAll('[data-type]');
const possibilities = Object.freeze({ 1: "rock", 2: 'paper', 3: 'scissor' });
const outcomes = Object.freeze({ 1: "Tie", 2: 'Loose', 3: 'Win' });
const state = { user: { lastModifier: 'scene__hand_rock', wins: 0 }, opponent: { lastModifier: 'scene__hand_rock', wins: 0 } };
const getRandomFromObj = (obj) =>  Math.floor((Math.random() * Math.floor(Object.keys(obj).length) + 1));
const getLogic = (outcomes, a, b) => a === b ? outcomes[1] : (((a - b + 3) % 3 === 1)) ? outcomes[2] : outcomes[3];
const getModifier = (modifier) => `scene__hand_${modifier}`;

const getOutcomeAndUpdateDOM = (e) => {
	const choiceDataType = Number(e.target.getAttribute('data-type'));
	const opponentChoice = getRandomFromObj(possibilities);
	updateDOM(opponentChoice, choiceDataType);
}

const updateDOM = (opponentChoice, choiceDataType) => {
	userHand.classList.remove(state.user.lastModifier);
	opponentHand.classList.remove(state.opponent.lastModifier)
	state.user.lastModifier = getModifier(possibilities[choiceDataType]);
	state.opponent.lastModifier = getModifier(possibilities[opponentChoice]);	
	userHand.classList.add(state.user.lastModifier);
	opponentHand.classList.add(state.opponent.lastModifier);

	const outcome = getLogic(outcomes, opponentChoice, choiceDataType);
	state.user.wins = outcome === 'Win' ? state.user.wins+1 : state.user.wins;
	state.opponent.wins = outcome === 'Loose' ? state.opponent.wins+1 : state.opponent.wins;
	scoreLeft.textContent = state.user.wins;
	scoreRight.textContent = state.opponent.wins;
	title.textContent = outcome;
}

buttons.forEach((button) => button.addEventListener('click', getOutcomeAndUpdateDOM));



// Just monkey business with mutation observer, not needed at all
let timer;
const callback = (entry) => {
	clearTimeout(timer);
	const target = entry[0].target;
	target.classList.add('scene__title_modified');
	timer = setTimeout(() => target.classList.remove('scene__title_modified'), 1000);
}

const observer = new MutationObserver(callback);
observer.observe(title, { childList: true });