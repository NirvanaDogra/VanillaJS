import CustomComponent from "./foundation/CustomComponent.js";

class CustomeButton extends CustomComponent {
  constructor() {
    super();
    this._name = "Button";
  }

  connectedCallback() {
    super.connectedCallback();
    let clickHandler = this.getAttribute("onclick");
    if (typeof clickHandler == "string") {
      clickHandler = eval(clickHandler);
    }
    this.addEventListener("click", clickHandler);
  }

  createCustomStyle() {
    return `
        button {
            background-color: brown;
            outline: 0dp; 
            border: 0dp;
        }
    `;
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
