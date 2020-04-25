class Keyboard {
    constructor(game, inputs) {
        this.game = game;
        this.inputs = inputs.toUpperCase();

        this.keyboard = document.getElementById("keyboard");
    }

    reset = () => {
        this.generateKeys();
    };

    generateKeys = () => {
        this.removeKeys();
        this.inputs.split("").forEach((key) => {
            this.keyboard.innerHTML += `<span class="key">${key}</span>`;
        });
        this.keys = document.querySelectorAll(".key");
    };

    removeKeys = () => (this.keyboard.innerHTML = "");

    respondToUserInput = () => {
        this.respondToKeyPress();
        this.respondToClick();
    };

    respondToKeyPress = () => {
        document.onkeypress = (event) => {
            const char = this.convertToChar(event.keyCode);
            if (this.inputIsValid(char)) this.submit(char);
        };
    };

    respondToClick = () => {
        this.keys.forEach((key) => {
            key.onclick = (event) => this.submit(event.target.innerText);
        });
    };

    ignoreUserInput = () => {
        this.ignoreKeyPress();
        this.ignoreAllClicks();
    };

    ignoreKeyPress = () => (document.onkeypress = null);

    ignoreClick = (key) => (key.onclick = null);

    ignoreAllClicks = () => this.keys.forEach((key) => this.ignoreClick(key));

    inputIsValid = (char) => {
        return (
            this.inputs.includes(char) &&
            !this.getKeyFor(char).classList.contains("incorrect")
        );
    };

    convertToChar = (keyCode) => String.fromCharCode(keyCode).toUpperCase();

    submit = (letter) => {
        this.game.guess(letter);
        this.updateKeyFor(letter);
    };

    getKeyFor = (letter) => this.keys[this.inputs.indexOf(letter)];

    updateKeyFor = (letter) => {
        const key = this.getKeyFor(letter);
        key.classList.add(
            this.game.guessIsCorrect(letter) ? "correct" : "incorrect"
        );
        this.ignoreClick(key);
    };
}
