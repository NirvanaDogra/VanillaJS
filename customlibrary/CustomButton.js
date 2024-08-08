import CustomComponent from "./CustomComponent.js";


class CustomeButton extends CustomComponent {
  constructor() {
    super();
    
  }

  connectedCallback() {
    const buttonElem = super.render(this.createCustomStyle(), this.createCustomTemplete())
    let clickHandler = this.getAttribute("onClick")
    if(typeof clickHandler == "string") {
        clickHandler = eval(clickHandler)
    }
    buttonElem.addEventListener("click", clickHandler)
  }

  createCustomStyle() {
    return `
        button {
            background-color: brown;
            outline: 0dp; 
            border: 0dp;
        }
    `
  }

  createCustomTemplete() {
    const template = document.createElement("div");
    template.innerHTML = `
            <button>h1</button
        `;
    return template.cloneNode(true);
  }
}

customElements.define("custom-button", CustomeButton);
