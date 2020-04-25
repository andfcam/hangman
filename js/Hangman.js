class Hangman {
    constructor() {
        this.wordToGuess = this.generateLandmarkWord();
        this.lettersInWord = this.wordToGuess.toUpperCase().split("");

        this.incorrectGuesses = 0;
        this.lives = 6;

        this.domWord = document.getElementById("word");
        this.domBlanks = this.createBlanks();
        this.domMisses = document.getElementById("misses");
        this.domFeedback = document.getElementById("feedback");
    }

    start = () => {
        this.keyboard = new Keyboard(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.keyboard.respondToUserInput();
    };

    generateLandmarkWord = () => {
        const words = [
            "landmark",
            "information",
            "solutions",
            "property",
            "data",
            "technology",
            "angular",
            "report",
            "survey",
        ];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    };

    createBlanks = () => {
        this.lettersInWord.forEach(() => {
            this.domWord.innerHTML += `<span class="blank">&nbsp;</span>`;
        });
        return document.querySelectorAll(".blank");
    };

    guess = (letter) => {
        this.guessIsCorrect(letter)
            ? this.handleCorrectGuess(letter)
            : this.handleIncorrectGuess();
    };

    indicesOf = (letter) => {
        return this.lettersInWord.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };

    displayLetters = (indices, letter) => {
        indices.forEach((index) => {
            this.domBlanks[index].innerText = letter;
        });
    };

    guessIsCorrect = (letter) => this.indicesOf(letter).length;

    handleCorrectGuess = (letter) => {
        this.displayLetters(this.indicesOf(letter), letter);
        if (this.playerHasWon) this.endGame("You won!");
    };

    handleIncorrectGuess = () => {
        this.incorrectGuesses++;
        this.incrementMisses();
        if (this.playerHasLost) this.endGame("Game over!");
    };

    incrementMisses = () => (this.domMisses.innerHTML += `<span>X</span>`);

    get playerHasLost() {
        return this.incorrectGuesses >= this.lives;
    }

    get playerHasWon() {
        return Array.from(this.domBlanks).every((blank) => {
            return /[A-Z]/.test(blank.innerText);
        });
    }

    endGame = (message) => {
        this.keyboard.ignoreUserInput();
        this.domFeedback.innerText = message;
    };
}

// Create a separate UI class to handle dom

// Word options: User input, Landmark themed, From dictionary

// Able to define word to guess first
// Able to take random word (from dictionary api)
// Able to specify length of word
// Hint (taken from dictionary api)
// Restart game

// Word defined/fetched before initialising game?
// Define number of lives, display and count down

// Visual representation of hangman?
// TESTING
// README

// Make repo public
// Send to Ben
