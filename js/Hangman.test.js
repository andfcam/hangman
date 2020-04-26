import Hangman from "./Hangman.js";

const words = ["apple", "orange", "pear"];

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

test("Checking if working", () => {
    const hangman = new Hangman(words, 6);
    console.log(hangman.words);
});
