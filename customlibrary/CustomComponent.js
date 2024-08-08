export default class CustomComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.mainComp = document.createElement("div");
    this.mainComp.setAttribute("class", "custom-comp");
    this._attributes = {};
    this._style = document.createElement("style");
  }

  connectedCallback() {}

  createCustomStyle() {
    return null;
  }

  createCustomTemplete() {
    return null;
  }

  render(style, template) {
    this.mainComp.append(template);
    this._style.textContent = style;
    console.log(style)
    this.shadowRoot.appendChild(this.mainComp);
    this.shadowRoot.appendChild(this._style);
    return this.shadowRoot
  }
}
