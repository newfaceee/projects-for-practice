// Массив со словами
const words = ['letter', 'man', 'women', 'car', 'bear', 'motorcycle'];

// Объявление переменных для связи с DOM
const siteWordElement = document.querySelector('.word');
const siteLettersElement = siteWordElement.children;
const siteWrongLettersElement = document.querySelector('.wrong span');
const siteAttemptsLeftElement = document.querySelector('.attempts-left span');
const siteNotificationElement = document.querySelector('.notification');

// Объявления переменных, связанных с правилами игры
const ATTEMPTS = 5;
let attemptsLeft = ATTEMPTS;
let wrongLetters = [];
// Функция для получения случайного числа 
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Генирирование случайного слова
const generatedWord = words[0, getRandomNumber(0, words.length)].split('');
console.log(generatedWord);
// Отрисовка количества букв сгенирированного слова в DOM
const generateWordMarkup = () => {
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
			};
		});
	} else if (!wrongLetters.includes(pressedLetter)) {
		wrongLetters.push(pressedLetter);
		siteWrongLettersElement.textContent = wrongLetters.join(',');
		attemptsLeft--;
		siteAttemptsLeftElement.textContent = attemptsLeft;
		if (attemptsLeft === 0) {
			gameOver();
		}
	} else if (wrongLetters.includes(pressedLetter)) {
		siteNotificationElement.classList.add('notification--shown');
		setTimeout(() => {
			siteNotificationElement.classList.remove('notification--shown');
		}, 500);
	}
};
// GAMEOVER
// const gameOver = () {
	
// };

// Вызов функции отрисовки слова
generateWordMarkup();
console.log(siteLettersElement);

// const checkLetters = (evt) => {
// 	const lettersElements = wordElement.children;
// 	const letterKeyCode = evt.keyCode;
// 	const pressedLetter = String.fromCharCode(letterKeyCode);
// 	console.log(lettersElements);
// 	letters.forEach((letter, index) => {
		
// 		if (letter === pressedLetter) {
// 			lettersLeft -= 1;

// 			lettersElements[index].classList.remove('letter--closed');
// 			lettersElements[index].textContent = letter;
// 			if (lettersLeft === 0) {
// 				win();
// 			}
// 		} else {
// 			// attemptsCount--;
// 			// attemptsCount === 0 ? gameOver : '';
// 		}
// 	});
// }
// const gameOver = () => {
// 	console.log('You lose, lol');
// 	document.body.removeEventListener('keypress', checkLetters);
// };
// const win = () => {
// 	console.log('You win, lol');
// 	document.body.removeEventListener('keypress', checkLetters);
// }


// generateWordButton.addEventListener('click', generateWordMarkup);
// // const letter = document.createElement('div');
// // letter.classList.add('letter');

