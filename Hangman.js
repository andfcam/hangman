class Hangman {
    constructor(word) {
        this.word = word;
        this.incorrectGuesses = 0;
        this.lettersInWord = word.toUpperCase().split("");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
        this.domFeedback = document.getElementById("feedback");
        this.domKeyboard = document.getElementById("keyboard");
    }

    start = () => {
        this.setup();
        document.onkeypress = (event) => {
            this.guess(this.convertToChar(event.keyCode));
        };
    };

    convertToChar = (keyCode) => String.fromCharCode(keyCode).toUpperCase();

    setup = () => {
        this.displayUnderscores();
        this.createKeyboard();
    };

    guess = (letter) => {
        const indices = this.allIndicesOf(letter);
        if (indices.length) {
            this.displayLetters(indices, letter);
        } else {
            this.handleIncorrectGuess();
        }
    };

    allIndicesOf = (letter) => {
        return this.lettersInWord.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };

    createKeyboard = () => {
        this.createKeys();
        this.respondToUserInput();
    };

    createKeys = () => {
        for (let keyCode = 65; keyCode <= 90; keyCode++) {
            this.domKeyboard.innerHTML += this.domKey(keyCode);
        }
    };

    domKey = (keyCode) => {
        return `<span class="key">
                ${this.convertToChar(keyCode)}
                </span>`;
    };

    respondToUserInput = () => {
        const keys = document.querySelectorAll(".key");
        keys.forEach((key) => {
            key.onclick = (event) => this.guess(event.target.innerText);
        });
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

    handleIncorrectGuess = () => {
        this.incorrectGuesses++;
        this.displayMiss();
        if (this.incorrectGuesses >= 6) this.stop();
    };

    displayMiss = () => (this.domMisses.innerText += "X");

    stop = () => {
        this.domFeedback.innerText = "Game Over";
        document.onkeypress = null;
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

// Timed
// Visual representation of hangman
// Improve css
// TESTING
