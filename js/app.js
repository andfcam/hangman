import Hangman from "./Hangman.js";

const words = [
    "landmark",
    "information",
    "solutions",
    "property",
    "data",
    "technology",
    "angular",
    "reports",
    "survey",
    "hireme",
    "ordnance",
    "exeter",
];

window.onload = () => {
    const hangman = new Hangman(words, 6);
    hangman.reset();
};
