class Keyboard {
    constructor(game) {
        this.game = game;

        this.domKeyboard = document.getElementById("keyboard");
    }

    generate = () => {
        this.createKeys();
        this.respondToUserInput();
    };

    createKeys = () => {
        for (let keyCode = 65; keyCode <= 90; keyCode++) {
            this.domKeyboard.innerHTML += this.domKey(keyCode);
        }
        this.domKeys = document.querySelectorAll(".key");
    };

    domKey = (keyCode) => {
        return `<span class="key">
                ${this.convertToChar(keyCode)}
                </span>`;
    };

    respondToUserInput = () => {
        document.onkeypress = (event) => {
            this.game.guess(this.convertToChar(event.keyCode));
        };
        this.domKeys.forEach((key) => {
            key.onclick = (event) => this.game.guess(event.target.innerText);
        });
    };

    ignoreUserInput = () => {
        document.onkeypress = null;
        this.domKeys.forEach((key) => (key.onclick = null));
    };

    convertToChar = (keyCode) => String.fromCharCode(keyCode).toUpperCase();
}
