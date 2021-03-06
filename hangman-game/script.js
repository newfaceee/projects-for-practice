// Массив со словами
const words = ['letter', 'man', 'women', 'car', 'bear', 'motorcycle'];

// Объявление переменных для связи с DOM
const siteWordElement = document.querySelector('.word');
const siteLettersElement = siteWordElement.children;
const siteWrongLettersElement = document.querySelector('.wrong span');
const siteAttemptsLeftElement = document.querySelector('.attempts-left span');
const siteNotificationElement = document.querySelector('.notification');
const siteGameResultPopupElement = document.querySelector('.game-result');
const siteGameResultTextElement = siteGameResultPopupElement.querySelector('.game-result__text');
const sitePlayAgainButton = document.querySelector('.btn-restart');
// Объявления переменных, связанных с правилами игры
const ATTEMPTS = 5;
let generatedWord, attemptsLeft;
let wrongLetters = [];
let correctLetters = [];

// Функция для получения случайного числа 
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


// Отрисовка количества букв сгенирированного слова в DOM
const generateWordMarkup = () => {
	siteWordElement.innerHTML = '';
	attemptsLeft = ATTEMPTS;
	correctLetters = [];
	wrongLetters = [];
	generatedWord = words[0, getRandomNumber(0, words.length)].split('');
	siteAttemptsLeftElement.textContent = attemptsLeft;
	const lettersMarkup = generatedWord.map(() => {
		return `<span class="letter"></span>`;
	}).join('\n');
	siteWordElement.insertAdjacentHTML('beforeend', lettersMarkup);
	document.body.addEventListener('keypress', checkLetters);
};

// Функция для проверки нажатых букв
const checkLetters = (evt) => {
	const pressedLetter = evt.key.toLowerCase();
	if (generatedWord.includes(pressedLetter)) {
		generatedWord.map((letter, index) => {
			if (pressedLetter === letter) {
				siteLettersElement[index].textContent = pressedLetter;
				correctLetters.push(pressedLetter);
			};
		});
		if (correctLetters.length === generatedWord.length) {
			gameOver('win');
			document.body.removeEventListener('keypress', checkLetters);
		}
	} else if (!wrongLetters.includes(pressedLetter)) {
		wrongLetters.push(pressedLetter);
		siteWrongLettersElement.textContent = wrongLetters.join(',');
		attemptsLeft--;
		siteAttemptsLeftElement.textContent = attemptsLeft;
		if (attemptsLeft === 0) {
			gameOver('lose');
			document.body.removeEventListener('keypress', checkLetters);
		};
	} else if (wrongLetters.includes(pressedLetter)) {
		
		siteNotificationElement.classList.add('notification--shown');
		setTimeout(() => {
			siteNotificationElement.classList.remove('notification--shown');
		}, 500);
		
	}
};
// GAMEOVER
const gameOver = (result) => {
	switch (result) {
		case 'win':
		siteGameResultTextElement.innerHTML = 'You win, lol &#x1F60E;';
		break;
		case 'lose':
		siteGameResultTextElement.innerHTML = 'You lost, lol &#x1F613;';
		break;
	};
	siteGameResultPopupElement.classList.add('game-result--active');
};
sitePlayAgainButton.addEventListener('click', () => {
	generateWordMarkup();
	siteGameResultPopupElement.classList.remove('game-result--active');
});
// Вызов функции отрисовки слова
generateWordMarkup();

