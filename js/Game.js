/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */


//Game class for managing the game's state, logic, and interactions.


class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      new Phrase('hello world'),
      new Phrase('believe in yourself'),
      new Phrase('stay positive be happy'),
      new Phrase('be the change'),
      new Phrase('never give up')
    ];
    this.activePhrase = null;
    this.guessedLetters = [];
    this.attemptsUsed = 0;
    this.keyboardEventListener = null;
  }


//startGame() hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase.


  startGame() {
    this.missed = 0;
    this.guessedLetters = [];
    this.attemptsUsed = 0;

    const phraseContainer = document.getElementById('phrase');
    phraseContainer.innerHTML = '';

    const overlay = document.getElementById('overlay');
    const previousMessage = overlay.querySelector('p');
    if (previousMessage) {
        previousMessage.remove();
    }
    overlay.style.display = 'none';

    this.resetKeyboard();

    const hearts = document.querySelectorAll('.tries img');
    hearts.forEach(heart => {
        heart.src = 'images/liveHeart.png';
    });

    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();

    if (this.keyboardEventListener) {
        window.removeEventListener('keydown', this.keyboardEventListener);
    }

    this.keyboardEventListener = (event) => this.handleKeyboardInput(event);
    window.addEventListener('keydown', this.keyboardEventListener);
}


//controls most of the game logic.


handleKeyboardInput(event) {
    const key = event.key.toLowerCase();
    const button = document.querySelector(`.key[data-key="${key}"]`);

    if (!button || button.disabled) return;

    this.handleInteraction(button, true);
}


//reset keyboard functionality.


  resetKeyboard() {
    const keyboardButtons = document.querySelectorAll('.key');
    keyboardButtons.forEach(button => {
      button.classList.remove('chosen', 'wrong');
      button.disabled = false;
    });
  }


//get random phrases.


  getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomIndex];
  }

  handleInteraction(button, isKeyboardInput = false) {
    const letter = button.textContent.toLowerCase();
  
    if (this.guessedLetters.includes(letter)) return;
  
    this.guessedLetters.push(letter);
    button.disabled = true;
  
    if (!this.activePhrase.checkLetter(letter)) {
      button.classList.add('wrong');
      this.removeLife();
    } else {
      button.classList.add('chosen');
      this.activePhrase.showMatchedLetter(letter);
  
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    }
  
    this.attemptsUsed++;
  
    if (this.missed >= 5) {
      this.gameOver(false);
    }
  }

  handleKeyboardInput(event) {
    const key = event.key.toLowerCase();
    const button = document.querySelector(`.key[data-key="${key}"]`);
    if (!button || button.disabled) return;
    this.handleInteraction(button, true);
}


//count the tries and replace the heart image accordingly.


  removeLife() {
    const hearts = document.querySelectorAll('img[src="images/liveHeart.png"]');
    if (hearts.length > 0) {
      hearts[0].src = 'images/lostHeart.png';
      this.missed++;
  
      if (this.missed >= 5) {
        this.gameOver(false);
      }
    }
  }

  checkForWin() {
    const hiddenLetters = document.querySelectorAll('.letter.hide');
    return hiddenLetters.length === 0;
  }


//check the outcome and display the message for won or lost, and the correct phrase accordingly.


  gameOver(hasWon) {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const message = hasWon ? 'Congratulations! You won!' : 'Sorry, you lost.';
    const overlayH1 = overlay.querySelector('h1');
    overlayH1.textContent = message;
    const btnReset = document.getElementById('btn__reset');
    btnReset.textContent = "Play Again?";

    let phraseDisplay = overlay.querySelector('p');
    if (!phraseDisplay) {
        phraseDisplay = document.createElement('p');
        phraseDisplay.textContent = `The phrase was: ${this.activePhrase.phrase}`;
        overlay.appendChild(phraseDisplay);
    }

    const overlayClass = hasWon ? 'win' : 'lose';
    overlay.className = overlayClass;

    if (this.keyboardEventListener) {
        window.removeEventListener('keydown', this.keyboardEventListener);
    }
}
}
