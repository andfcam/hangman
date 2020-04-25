class Hangman {
    constructor(words, lives) {
        this.words = words;
        this.lives = lives;

        this.keyboard = new Keyboard(this, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

        this.domWord = document.getElementById("word");
        this.domMisses = document.getElementById("misses");
    }

    reset = () => {
        this.setNewWord();
        this.resetGuesses();
        this.keyboard.reset();
        this.keyboard.respondToUserInput();
    };

    setNewWord = () => {
        this.wordToGuess = this.selectRandomWordFrom(words);
        this.lettersToGuess = this.wordToGuess.toUpperCase().split("");
        this.createBlanks(this.lettersToGuess);
    };

    selectRandomWordFrom = (words) => {
        const random = Math.floor(Math.random() * words.length);
        return words[random];
    };

    createBlanks = (letters) => {
        this.removeBlanks();
        letters.forEach(() => {
            this.domWord.innerHTML += `<span class="blank">&nbsp;</span>`;
        });
        this.domBlanks = document.querySelectorAll(".blank");
    };

    resetGuesses = () => {
        this.incorrectGuesses = 0;
        this.removeMisses();
    };

    removeBlanks = () => (this.domWord.innerHTML = "");

    removeMisses = () => (this.domMisses.innerHTML = "");

    guess = (letter) => {
        this.guessIsCorrect(letter)
            ? this.handleCorrectGuess(letter)
            : this.handleIncorrectGuess();
    };

    guessIsCorrect = (letter) => this.indicesOf(letter).length;

    handleCorrectGuess = (letter) => {
        this.revealLetters(this.indicesOf(letter), letter);
        if (this.playerHasWon) this.endGame("You won!");
    };

    handleIncorrectGuess = () => {
        this.incorrectGuesses++;
        this.incrementMisses();
        if (this.playerHasLost) this.endGame("Game over!");
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
        this.revealAllLetters();
        alert(message);
    };
}

// Create a separate UI class to handle dom

// Restart game

// Define number of lives, display and count down

// TESTING
// README

// Make repo public
// Send to Ben
