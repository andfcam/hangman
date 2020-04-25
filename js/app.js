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
    const game = new Hangman(words, 6);
    game.start();
};
