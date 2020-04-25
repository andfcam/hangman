class Hangman {
    constructor(words, lives) {
        this.words = words;
        this.lives = lives;

        this.keyboard = new Keyboard(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
        this.domLives = document.getElementById("lives");
    }

    reset = () => {
        this.setNewWord();
        this.setGuessesTo(0);
        this.keyboard.reset();
        this.keyboard.respondToUserInput();
    };

    setNewWord = () => {
        this.wordToGuess = this.selectRandomWordFrom(words);
        this.lettersToGuess = this.wordToGuess.toUpperCase().split("");
        this.generateBlanks();
    };

    selectRandomWordFrom = (words) => {
        const random = Math.floor(Math.random() * words.length);
        return words[random];
    };

    generateBlanks = () => {
        this.removeBlanks();
        const span = `<span class="blank">&nbsp;</span>`;
        this.domWord.innerHTML = span.repeat(this.numberOfLetters);
        this.domBlanks = document.querySelectorAll(".blank");
    };

    removeBlanks = () => (this.domWord.innerHTML = "");

    get numberOfLetters() {
        return this.lettersToGuess.length;
    }

    setGuessesTo = (numberOfGuesses) => {
        this.incorrectGuesses = numberOfGuesses;
        this.domLives.innerText = this.lives - numberOfGuesses;
        this.domMisses.innerHTML = `<span>X</span>`.repeat(numberOfGuesses);
    };

    guess = (letter) => {
        this.guessIsCorrect(letter)
            ? this.handleCorrectGuess(letter)
            : this.handleIncorrectGuess();
    };

    guessIsCorrect = (letter) => this.indicesOf(letter).length;

    handleCorrectGuess = (letter) => {
        this.revealLetters(this.indicesOf(letter), letter);
        if (this.playerHasWon) this.endGame("Congratulations, you win!");
    };

    handleIncorrectGuess = () => {
        this.setGuessesTo(this.incorrectGuesses + 1);
        if (this.playerHasLost) this.endGame("Unlucky! Game over. Play again?");
    };

    indicesOf = (letter) => {
        return this.lettersToGuess.reduce((indices, element, index) => {
            if (element === letter) indices.push(index);
            return indices;
        }, []);
    };

    revealLetters = (indices, letter) => {
        indices.forEach((index) => {
            this.domBlanks[index].innerText = letter;
        });
    };

    revealAllLetters = () => {
        this.domBlanks.forEach((blank, index) => {
            blank.innerText = this.lettersToGuess[index];
        });
    };

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
        this.revealAllLetters();
        alert(message);
    };
}

// Create a separate UI class to handle dom

// TESTING
// README

// Make repo public
// Send to Ben
