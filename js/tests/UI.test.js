import Hangman from "../Hangman.js";
import UI from "../UI.js";

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

test("UI is instantiated", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    expect(hangman.ui).toBeInstanceOf(UI);
});

test("UI queries elements from the DOM", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    expect(hangman.ui.word).toBeDefined();
});

test("Clicking the reset button restarts the game", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    hangman.reset();
    hangman.guess("E");
    hangman.guess("Z");
    expect(hangman.incorrectGuesses).toEqual(1);
    hangman.ui.reset.click();
    expect(hangman.incorrectGuesses).toEqual(0);
});

test("Blanks are generated for each letter", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    hangman.lettersToGuess = ["O", "R", "A", "N", "G", "E"];
    hangman.ui.generateBlanks();
    expect(hangman.ui.word.childNodes).toHaveLength(6);
});

test("Blanks can be removed from the DOM", () => {
    const hangman = new Hangman(["purple", "orange", "indigo"], 4);
    hangman.reset();
    expect(hangman.ui.blanks).toHaveLength(6);
    hangman.ui.removeBlanks();
    expect(document.querySelectorAll(".blank")).toHaveLength(0);
});

test("Lives are displayed in the DOM", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    hangman.reset();
    expect(hangman.ui.lives.innerText).toEqual(7);
    hangman.guess("E");
    expect(hangman.ui.lives.innerText).toEqual(7);
    hangman.guess("Z");
    expect(hangman.ui.lives.innerText).toEqual(6);
    hangman.guess("W");
    expect(hangman.ui.lives.innerText).toEqual(5);
});

test("Misses are displayed in the DOM", () => {
    const hangman = new Hangman(["red", "green", "blue"], 7);
    hangman.reset();
    expect(hangman.ui.misses.childNodes).toHaveLength(0);
    hangman.guess("E");
    expect(hangman.ui.misses.childNodes).toHaveLength(0);
    hangman.guess("Z");
    expect(hangman.ui.misses.childNodes).toHaveLength(1);
    hangman.guess("W");
    expect(hangman.ui.misses.childNodes).toHaveLength(2);
});

test("Letters are revealed", () => {
    const hangman = new Hangman(["aardvark", "antelope", "alligator"], 6);
    hangman.reset();
    expect(hangman.ui.blanks[0].innerText).toBeUndefined();
    hangman.guess("Q");
    expect(hangman.ui.blanks[0].innerText).toBeUndefined();
    hangman.guess("A");
    expect(hangman.ui.blanks[0].innerText).toEqual("A");
    hangman.guess("R");
    expect(hangman.ui.blanks[0].innerText).toEqual("A");
});
