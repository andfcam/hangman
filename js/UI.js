import Keyboard from "./Keyboard.js";

export default class UI {
    constructor(game) {
        this.game = game;
        this.keyboard = new Keyboard(game, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

        this.word = document.getElementById("word");
        this.lives = document.getElementById("lives");
        this.misses = document.getElementById("misses");
        this.reset = document.getElementById("reset");

        this.listenForReset();
    }

    listenForReset = () => (this.reset.onclick = this.game.reset);

    generateBlanks = () => {
        this.removeBlanks();
        const span = `<span class="blank">&nbsp;</span>`;
        this.word.innerHTML = span.repeat(this.game.numberOfLetters);
        this.blanks = document.querySelectorAll(".blank");
    };

    removeBlanks = () => (this.word.innerHTML = "");

    updateLives = () => {
        this.lives.innerText = this.game.lives - this.game.incorrectGuesses;
        const x = `<span>X</span>`;
        this.misses.innerHTML = x.repeat(this.game.incorrectGuesses);
    };

    revealLetters = (indices, letter) => {
        indices.forEach((index) => (this.blanks[index].innerText = letter));
    };

    revealAllLetters = () => {
        this.blanks.forEach((blank, index) => {
            blank.innerText = this.game.lettersToGuess[index];
        });
    };
}
