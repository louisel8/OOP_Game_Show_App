/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */


//built the Phrase Class includes three methods for managing the display of phrases.


class Phrase {
    constructor(phrase) {
      this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
      const phraseContainer = document.getElementById('phrase');
      const letters = this.phrase.split('');
      letters.forEach(letter => {
        const listItem = document.createElement('li');
        if (letter === ' ') {
          listItem.classList.add('space');
        } else {
          listItem.classList.add('letter');
          listItem.textContent = letter;
          listItem.classList.add('hide');
        }
        phraseContainer.appendChild(listItem);
      });
    }

    checkLetter(letter) {
      return this.phrase.includes(letter);
    }

    showMatchedLetter(letter) {
      const letterElements = document.querySelectorAll('.letter');
      letterElements.forEach(element => {
        if (element.textContent.toLowerCase() === letter.toLowerCase()) {
          element.classList.remove('hide');
          element.classList.add('show');
        }
      });
    }
  }
