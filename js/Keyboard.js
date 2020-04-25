class Keyboard {
    constructor(game, keys) {
        this.game = game;
        this.keys = keys.toUpperCase();

        this.domKeyboard = document.getElementById("keyboard");
    }

    reset = () => {
        this.createKeys();
    };

    createKeys = () => {
        this.removeKeys();
        this.keys.split("").forEach((key) => {
            this.domKeyboard.innerHTML += `<span class="key">${key}</span>`;
        });
        this.domKeys = document.querySelectorAll(".key");
    };

    removeKeys = () => (this.domKeyboard.innerHTML = "");

    respondToUserInput = () => {
        this.respondToKeyPress();
        this.respondToClick();
    };

    respondToKeyPress = () => {
        document.onkeypress = (event) => {
            const char = this.convertToChar(event.keyCode);
            if (this.inputIsValid(char)) this.input(char);
        };
    };

    respondToClick = () => {
        this.domKeys.forEach((key) => {
            key.onclick = (event) => this.input(event.target.innerText);
        });
    };

    ignoreUserInput = () => {
        this.ignoreKeyPress();
        this.ignoreClicks();
    };

    ignoreKeyPress = () => (document.onkeypress = null);

    ignoreClicks = () => this.domKeys.forEach((key) => (key.onclick = null));

    inputIsValid = (char) => {
        return (
            this.keys.includes(char) &&
            !this.getDomKey(char).classList.contains("incorrect")
        );
    };

    convertToChar = (keyCode) => String.fromCharCode(keyCode).toUpperCase();

    input = (letter) => {
        this.game.guess(letter);
        this.updateKeyFor(letter);
    };

    getDomKey = (letter) => this.domKeys[this.keys.indexOf(letter)];

    updateKeyFor = (letter) => {
        const key = this.getDomKey(letter);
        key.classList.add(
            this.game.guessIsCorrect(letter) ? "correct" : "incorrect"
        );
        key.onclick = null;
    };
}
