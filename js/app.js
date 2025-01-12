/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


//built new instance, event listener so that users can interact with the game and to initiate the game's functionality.


let game;

document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('btn__reset');
    startButton.addEventListener('click', () => {
        game = new Game();
        game.startGame();
    });

    const keyboard = document.getElementById('qwerty');

    keyboard.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            game.handleInteraction(event.target);
        }
    });
});
