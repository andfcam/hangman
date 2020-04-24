window.onload = () => {
    const game = new Hangman("hangman");
    game.start();
};

// If it is - display it
// If it isn't - increase no. of misses
// If you miss 6 times, it's game over
