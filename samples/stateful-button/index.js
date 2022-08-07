(() => {
    
    class statefulButton extends HTMLElement {

        #key;       // Local storage key for this button
        #state;     // Current state for this button - falsy or true

        constructor() {
            super();
            this.#key = `stateful-button-${this.id}`;
            this.#state = localStorage.getItem(this.#key);
        }

        #render() {
            if (!this.#state) {
                this.innerHTML = "OFF";
            } else {
                this.innerHTML = "ON";
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

        async connectedCallback () {

            this.onclick = this.#clickHandler;
            this.#render();
            
        }
}

    customElements.define('stateful-button', statefulButton);
    
})();
    