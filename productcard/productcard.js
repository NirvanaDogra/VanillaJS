export default class ProductCard extends HTMLElement {
    constructor() {
        super()
        console.log("init ")
        this.attachShadow({mode:"open"})

    }

    createCardTemplate() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .card {
                    display: flex;
                    flex-direction: column;
                    background-color: blue;
                    border-radius: 8px;
                    padding: 16px;
                    max-width: 300px;
                }
            </style>
            <div class="card">
                <h3 class="card-title">Title</h3>
                <img class="card-image" src="placeholder.jpg" alt="Product Image"/>
                <p class="card-price">This is the info about the product</p>
                <div>
                    <button class="card-price">$0.00</button>
                </div>
            </div>
        `;
        return template.content.cloneNode(true);
    }

    connectedCallback() {
        const item = this.createCardTemplate();
        this.shadowRoot.appendChild(item)
        this.updateCardContent()     
    }

    updateCardContent() {
        const {title, img, dec, price} = this.getAttributes()
        const titleElement = this.shadowRoot.querySelector(".card-title")
        titleElement.value = title;
        const imgElement = this.shadowRoot.querySelector(".card-image")
        imgElement.src = img
        const pElement = this.shadowRoot.querySelector(".card-price")
        pElement.value = dec
        const buttonElement = this.shadowRoot.querySelector(".card-price")
        buttonElement.innertText = price
    }

    getAttributes() {
        return this.attributes
    }
}

window.customElements.define("product-card", ProductCard)