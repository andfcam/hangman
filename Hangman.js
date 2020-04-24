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
        document.onkeypress = (event) =>
            this.guess(this.convertToChar(event.keyCode));
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
            this.incorrectGuesses++;
            this.displayMiss();
            if (this.incorrectGuesses >= 6) this.stop();
        }
    };

    allIndicesOf = (letter) => {
        return this.lettersInWord.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };

    createKeyboard = () => {
        for (let keyCode = 65; keyCode <= 90; keyCode++) {
            this.domKeyboard.innerHTML += `<span class="key">
            ${this.convertToChar(keyCode)}
            </span>`;
        }
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

    displayMiss = () => (this.domMisses.innerText += "X");

    stop = () => {
        this.domFeedback.innerText = "Game Over";
        document.onkeypress = null;
    };
}

// If you miss 6 times, it's game over
