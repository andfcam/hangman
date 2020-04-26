import UI from "./UI.js";

export default class Hangman {
    constructor(words, lives) {
        this.words = words;
        this.lives = lives;

        this.ui = new UI(this);
    }

    reset = () => {
        this.setNewWord();
        this.setGuessesTo(0);
        this.ui.keyboard.reset();
        this.ui.keyboard.respondToUserInput();
    };

    setNewWord = () => {
        this.wordToGuess = this.selectRandomWordFrom(this.words);
        this.lettersToGuess = this.wordToGuess.toUpperCase().split("");
        this.ui.generateBlanks();
    };

    selectRandomWordFrom = (words) => {
        const random = Math.floor(Math.random() * words.length);
        return words[random];
    };

    get numberOfLetters() {
        return this.lettersToGuess.length;
    }

    setGuessesTo = (numberOfGuesses) => {
        this.incorrectGuesses = numberOfGuesses;
        this.ui.updateLives();
    };

    guess = (letter) => {
        this.guessIsCorrect(letter)
            ? this.handleCorrectGuess(letter)
            : this.handleIncorrectGuess();
    };

    guessIsCorrect = (letter) => this.indicesOf(letter).length;

    handleCorrectGuess = (letter) => {
        this.ui.revealLetters(this.indicesOf(letter), letter);
        if (this.playerHasWon) this.endGame("Congratulations, you win!");
    };

    handleIncorrectGuess = () => {
        this.setGuessesTo(this.incorrectGuesses + 1);
        if (this.playerHasLost) this.endGame("Unlucky! Game over. Play again?");
    };

    indicesOf = (input) => {
        return this.lettersToGuess.reduce((indices, letter, index) => {
            if (letter === input) indices.push(index);
            return indices;
        }, []);
    };

    get playerHasLost() {
        return this.incorrectGuesses >= this.lives;
    }

    get playerHasWon() {
        return Array.from(this.ui.blanks).every((blank) => {
            return /[A-Z]/.test(blank.innerText);
        });
    }

    endGame = (message) => {
        this.ui.keyboard.ignoreUserInput();
        this.ui.revealAllLetters();
        alert(message);
    };
}

// TESTING
// README

// Make repo public
// Send to Ben
