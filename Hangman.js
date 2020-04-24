class Hangman {
    constructor(word) {
        this.word = word;
        this.incorrectGuesses = 0;
        this.lettersInWord = word.toUpperCase().split("");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
        this.domFeedback = document.getElementById("feedback");
    }

    start = () => {
        this.setup();
        document.onkeypress = (event) => this.guess(this.convertToChar(event));
    };

    convertToChar = (event) => String.fromCharCode(event.keyCode).toUpperCase();

    setup = () => {
        this.lettersInWord.forEach(
            () => (this.domWord.innerHTML += `<span>_</span>`)
        );
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
