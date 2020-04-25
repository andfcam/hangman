class Keyboard {
    constructor(game, keys) {
        this.game = game;
        this.keys = keys.toUpperCase();

        this.domKeyboard = document.getElementById("keyboard");
        this.createKeys();
    }

    createKeys = () => {
        this.keys.split("").forEach((key) => {
            this.domKeyboard.innerHTML += this.domKey(key);
        });
        this.domKeys = document.querySelectorAll(".key");
    };

    domKey = (key) => `<span class="key">${key}</span>`;

    respondToUserInput = () => {
        document.onkeypress = (event) => {
            const char = this.convertToChar(event.keyCode);
            if (this.guessIsValid(char)) this.game.guess(char);
        };
        this.domKeys.forEach((key) => {
            key.onclick = (event) => this.game.guess(event.target.innerText);
        });
    };

    ignoreUserInput = () => {
        document.onkeypress = null;
        this.domKeys.forEach((key) => (key.onclick = null));
    };

    guessIsValid = (char) => this.keys.includes(char);

    convertToChar = (keyCode) => String.fromCharCode(keyCode).toUpperCase();
}
