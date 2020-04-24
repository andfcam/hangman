window.onload = () => {
    const wordToGuess = "hangman".toUpperCase();
    console.log(wordToGuess);
};

// Start with 'HANGMAN' as fixed word
// User can input a key as a guess
// Check if the input letter is in the word
// If it is - display it
// If it isn't - increase no. of misses
// If you miss 6 times, it's game over
