class Hangman {
    constructor(word) {
        this.word = word;
        this.lettersInWord = word.toUpperCase().split("");
        this.incorrectGuesses = 0;

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
        this.domFeedback = document.getElementById("feedback");
    }

    start = () => {
        this.displayUnderscores();
        this.keyboard = new Keyboard(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.keyboard.respondToUserInput();
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
            () => (this.domWord.innerHTML += `<span>_</span>`)
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
        if (this.incorrectGuesses >= 6) this.stop();
    };

    displayMiss = () => (this.domMisses.innerText += "X");

    stop = () => {
        this.domFeedback.innerText = "Game Over";
        this.keyboard.ignoreUserInput();
    };
}

// Toggle classes to show whether letter is correct or not
// Create a separate UI class (and keyboard class?) to handle dom

// Define number of lives and count down
// Able to define word to guess first
// Able to take random word (predefined in array)
// Able to take random word (from dictionary api)
// Able to specify length of word
// Hint (taken from dictionary api)

// Visual representation of hangman
// Improve css
// TESTING
// README
