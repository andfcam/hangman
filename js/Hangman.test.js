import Hangman from "./Hangman.js";

window.alert = jest.fn();
document.body.innerHTML = `
    <main>
        <div id="word"></div>
        <div id="keyboard"></div>
        <p>
            LIVES REMAINING: <span id="lives"></span>
        </p>
        <p>
            MISSES: <span id="misses"></span>
        </p>
        <button id="reset">GET A NEW WORD</button>
    </main>`;

test("Arguments are passed to the game", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    expect(hangman.words).toEqual(["apple", "orange", "pear"]);
    expect(hangman.lives).toEqual(5);
});

test("Default values are taken if no arguments provided", () => {
    const hangman = new Hangman();
    hangman.reset();
    expect(hangman.words).toEqual(["error"]);
    expect(hangman.lives).toEqual(5);
});

test("Word is split into a string of capital letters", () => {
    const hangman = new Hangman(["apple"], 8);
    hangman.setNewWord();
    expect(hangman.lettersToGuess).toEqual(["A", "P", "P", "L", "E"]);
});

test("Starts after call", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    expect(hangman.wordToGuess).toBeUndefined();
    expect(() => hangman.guess("A")).toThrow();
    hangman.reset();
    expect(hangman.wordToGuess).not.toBeUndefined();
    expect(() => hangman.guess("A")).not.toThrow();
});

test("A word is selected", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(["apple", "orange", "pear"]).toContain(hangman.wordToGuess);
});

test("Counts the number of letters", () => {
    const hangman = new Hangman(["apple", "grape", "melon"], 8);
    hangman.reset();
    expect(hangman.numberOfLetters).toEqual(5);
});

test("Number of incorrect guesses can be set", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(hangman.incorrectGuesses).toEqual(0);
    hangman.setGuessesTo(3);
    expect(hangman.incorrectGuesses).toEqual(3);
});

test("Guesses are handled correctly", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(hangman.incorrectGuesses).toEqual(0);
    hangman.guess("Q");
    expect(hangman.incorrectGuesses).toEqual(1);
    hangman.guess("A");
    expect(hangman.incorrectGuesses).toEqual(1);
});

test("Guesses are identified as correct or incorrect", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(hangman.guessIsCorrect("Q")).not.toBeTruthy();
    expect(hangman.guessIsCorrect("A")).toBeTruthy();
});

test("Counter increments for incorrect guesses", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(hangman.incorrectGuesses).toEqual(0);
    hangman.handleIncorrectGuess();
    expect(hangman.incorrectGuesses).toEqual(1);
});

test("Returns the positions of a letter in the word", () => {
    const hangman = new Hangman(["paper"], 5);
    hangman.reset();
    expect(hangman.indicesOf("A")).toEqual([1]);
    expect(hangman.indicesOf("P")).toEqual([0, 2]);
    expect(hangman.indicesOf("O")).toEqual([]);
});

test("Determines if a player has lost", () => {
    const hangman = new Hangman(["apple", "orange", "pear"], 5);
    hangman.reset();
    expect(hangman.playerHasLost).not.toBeTruthy();
    hangman.setGuessesTo(5);
    expect(hangman.playerHasLost).toBeTruthy();
    hangman.setGuessesTo(4);
    expect(hangman.playerHasLost).not.toBeTruthy();
    hangman.setGuessesTo(20);
    expect(hangman.playerHasLost).toBeTruthy();
});

test("Determines if a player has won", () => {
    const hangman = new Hangman(["pasta", "tapas"], 5);
    hangman.reset();
    expect(hangman.playerHasWon).not.toBeTruthy();
    hangman.guess("A");
    expect(hangman.playerHasWon).not.toBeTruthy();
    hangman.guess("P");
    hangman.guess("S");
    hangman.guess("T");
    expect(hangman.playerHasWon).toBeTruthy();
});
