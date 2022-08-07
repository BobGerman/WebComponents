const BUTTON_KEY_PREFIX = 'stateful-button';

export class statefulButton extends HTMLElement {

    #key;       // Local storage key for this button
    #state;     // Current state for this button - falsy or true
    #shadowRoot;
    #button;

    constructor() {
        super();
        this.#key = BUTTON_KEY_PREFIX + this.id;
        this.#state = localStorage.getItem(this.#key);

        const shadowRoot = this.attachShadow({mode: 'open'});
        this.#button = document.createElement('button');
        shadowRoot.appendChild(this.#button);

    }

    #render() {
        if (!this.#state) {
            this.#button.innerHTML = "OFF";
        } else {
            this.#button.innerHTML = "ON";
        }
    }

    #clickHandler() {
        if (this.#state) {
            this.#state = false;
            localStorage.removeItem(this.#key);
        } else {
            this.#state = true;
            localStorage.setItem(this.#key, this.#state);
        }
        this.#render();
    }

    async connectedCallback() {

        this.onclick = this.#clickHandler;
        this.#render();

    }
}

customElements.define('stateful-button', statefulButton);


