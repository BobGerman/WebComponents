import stylesheet from './style.css' assert { type: 'css' };
const BUTTON_KEY_PREFIX = 'stateful-button';

// Singleton to store all buttons to keep them in sync
const statefulButtons = {};

export class statefulButton extends HTMLElement {

    #key;       // Local storage key for this button
    #button;

    constructor() {
        super();
        this.#key = BUTTON_KEY_PREFIX + this.id;

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.adoptedStyleSheets = [ stylesheet ];
        this.#button = document.createElement('button');
        shadowRoot.appendChild(this.#button);
    }

    #renderAll() {
        if (statefulButtons[this.#key]) {
            statefulButtons[this.#key].forEach((b) => {
                b.render();
            });
        }
    }

    render() {
        let state = localStorage.getItem(this.#key);
        if (state) {
            this.#button.innerHTML = "OFF";
            this.#button.className = "buttonOff";
        } else {
            this.#button.innerHTML = "ON";
            this.#button.className = "buttonOn";
        }
    }

    #clickHandler() {
        let state = localStorage.getItem(this.#key);
        if (state) {
            localStorage.removeItem(this.#key);
        } else {
            localStorage.setItem(this.#key, true);
        }
        this.#renderAll();
    }

    async connectedCallback() {

        if (!statefulButtons[this.#key]) {
            statefulButtons[this.#key] = [];
        }
        statefulButtons[this.#key].push(this);
        this.onclick = this.#clickHandler;
        this.render();

    }
}

customElements.define('stateful-button', statefulButton);


