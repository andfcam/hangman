class Hangman {
    constructor() {
        this.wordToGuess = this.getLandmarkWord();
        this.lettersInWord = this.wordToGuess.toUpperCase().split("");

        this.incorrectGuesses = 0;
        this.lives = 6;

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
        this.domFeedback = document.getElementById("feedback");
    }

    start = () => {
        this.displayUnderscores();
        this.keyboard = new Keyboard(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.keyboard.respondToUserInput();
    };

    getLandmarkWord = () => {
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

    guess = (letter) => {
        if (this.guessIsCorrect(letter)) {
            this.displayLetters(this.indicesOf(letter), letter);
        } else {
            this.handleIncorrectGuess();
        }
    };

    indicesOf = (letter) => {
        return this.lettersInWord.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };

    displayUnderscores = () => {
        this.lettersInWord.forEach(
            () => (this.domWord.innerHTML += `<span>&nbsp;</span>`)
        );
    };

    displayLetters = (indices, letter) => {
        indices.forEach((index) => {
            this.domWord.childNodes[index].innerText = letter;
        });
    };

    guessIsCorrect = (letter) => this.indicesOf(letter).length;

    handleIncorrectGuess = () => {
        this.incorrectGuesses++;
        this.displayMiss();
        if (this.playerHasLost) this.stop();
    };

    get playerHasLost() {
        return this.incorrectGuesses >= this.lives;
    }

    displayMiss = () => (this.domMisses.innerHTML += `<span>X</span>`);

    stop = () => {
        this.keyboard.ignoreUserInput();
        this.domFeedback.innerText = "Game over!";
    };
}

// Word options: User input, Landmark themed, From dictionary

// Game won event
// Able to define word to guess first
// Able to take random word (from dictionary api)
// Able to specify length of word
// Hint (taken from dictionary api)

// Word defined/fetched before initialising game
// Define number of lives, display and count down

// Create a separate UI class to handle dom?

// Visual representation of hangman
// Improve css
// TESTING
// README
