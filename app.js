window.onload = () => {
    const wordToGuess = "hangman";
    const lettersArray = wordToGuess.toUpperCase().split("");

    document.onkeypress = (event) => {
        const guessedLetter = String.fromCharCode(event.keyCode);
        if (lettersArray.includes(guessedLetter.toUpperCase())) {
            console.log("Correct");
        } else {
            console.log("Incorrect");
        }
    };
};

// Check if the input letter is in the word
// If it is - display it
// If it isn't - increase no. of misses
// If you miss 6 times, it's game over
