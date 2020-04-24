class Hangman {
    constructor(word) {
        this.word = word;
        this.lettersInWord = word.toUpperCase().split("");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
    }

    start = () => {
        this.setup();
        document.onkeypress = (event) => {
            this.guess(String.fromCharCode(event.keyCode));
        };
    };

    setup = () => {
        this.lettersInWord.forEach((letter) => {
            this.domWord.innerHTML += `<span>_</span>`;
        });
    };

    guess = (letter) => {
        if (this.lettersInWord.includes(letter.toUpperCase())) {
            console.log(true);
        } else {
            console.log(false);
        }
    };
}

// If it is - display it
// If it isn't - increase no. of misses
// If you miss 6 times, it's game over
