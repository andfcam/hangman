class Hangman {
    constructor(word) {
        this.word = word;
        this.lettersInWord = word.toUpperCase().split("");
    }

    start = () => {
        document.onkeypress = (event) =>
            this.guess(String.fromCharCode(event.keyCode));
    };

    guess = (letter) => {
        if (this.lettersInWord.includes(letter.toUpperCase())) {
            console.log(true);
        } else {
            console.log(false);
        }
    };
}
