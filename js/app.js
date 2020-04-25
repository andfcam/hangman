const words = [
    "landmark",
    "information",
    "solutions",
    "property",
    "data",
    "technology",
    "angular",
    "report",
    "survey",
    "hireme",
];

window.onload = () => {
    const hangman = new Hangman(words, 6);
    hangman.reset();

    document.getElementById("restart").onclick = hangman.reset;
};
