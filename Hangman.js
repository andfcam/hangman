class Hangman {
    constructor(word) {
        this.word = word;
        this.lettersInWord = word.toUpperCase().split("");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
    }

    start = () => {
        this.setup();
        document.onkeypress = (event) => this.guess(this.convertToChar(event));
    };

    convertToChar = (event) => String.fromCharCode(event.keyCode).toUpperCase();

    setup = () => {
        this.lettersInWord.forEach((letter) => {
            this.domWord.innerHTML += `<span>_</span>`;
        });
    };

    guess = (letter) => {
        const occurences = this.allIndices(letter);
        console.log(occurences);
    };

    allIndices = (letter) => {
        return this.lettersInWord.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };
}

// If it is - display it
// If it isn't - increase no. of misses
// If you miss 6 times, it's game over
