(() => {
    
    class statefulButton extends HTMLElement {

        async connectedCallback () {
            
            const key = `state-${this.id}`;
            let value = localStorage.getItem(key);
            if (!value) {
                this.innerHTML = "No value";
            } else {
                this.innerHTML = value;
            }
            this.onclick = () => {
                if (value) {
                    localStorage.removeItem(key);
                    value = null;
                    this.innerHTML = "No value";
                } else {
                    localStorage.setItem(key, "You clicked me");
                    value = "You clicked me";
                    this.innerHTML = "You clicked me";
                }
            }

        }
    }

    customElements.define('stateful-button', statefulButton);
    
})();
    