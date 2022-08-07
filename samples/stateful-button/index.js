(() => {
    
    class statefulButton extends HTMLElement {

        async connectedCallback () {
            this.innerHTML = '<b>Hello, world</b>';
            this.onclick = () => {
                alert('You clicked me!');
            }
        }
    }

    customElements.define('stateful-button', statefulButton);
    
})();
    