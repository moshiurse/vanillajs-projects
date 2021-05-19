const wordElem = document.getElementById('word');
const wrongLetterElem = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-msg');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['java', 'javascript', 'angular', 'react', 'vue', 'mongodb', 'express', 'nodejs'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden words 
function displayWord() {

    wordElem.innerHTML = `${selectedWord
        .split('')
        .map(letter => 
            `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span>
            `
        )
        .join('')}`;

        const innerWord = wordElem.innerText.replace(/\n/g, '')
        
        if(innerWord === selectedWord) {
            finalMsg.innerText = "Congrats!! You won";
            popup.style.display = 'flex';
        }
}

// update Wrong letters

function updateWrongLetterEl() {
    wrongLetterElem.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `
            <span>${letter}</span>
        `) }
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors){
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }

        if(wrongLetters.length === figureParts.length) {
            finalMsg.innerText = "You Lost, Try Again!!!";
            popup.style.display = 'flex';
        }
    })
}

// Show Notification

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 1000)
}

// kydown event
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterEl();
            }else{
                showNotification();
            }
        }
    }
})

playAgainBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWrongLetterEl();
})

displayWord();