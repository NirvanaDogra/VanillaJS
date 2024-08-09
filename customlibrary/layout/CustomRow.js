import CustomComponent from "../foundation/CustomComponent.js";

const IDENTIFIER = {
  stack: "row",
};

class CustomRow extends CustomComponent {
  constructor() {
    super();
    this._name = "Stack";
  }

  createCustomTemplete() {
    const item = document.createElement("div");
    item.innerHTML = `
            <div class=${IDENTIFIER.stack}>
                <slot><slot>
            </div>
        `;
    return item.cloneNode(true);
  }

  createCustomStyle() {
    const style = `
            .${IDENTIFIER.stack} {
                display:flex;
                flex-direction:row;
            }
        `;
    return style;
  }
}

customElements.define("custom-row", CustomRow);
