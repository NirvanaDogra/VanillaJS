export default class CustomComponent extends HTMLElement {
  constructor() {
    super();
    this._name = "";

    this.attachShadow({ mode: "open" });
    this.mainComp = this.createCustomTemplete();
    this.mainComp.setAttribute("class", "custom-comp");

    this._style = document.createElement("style");
    this._style.append(this.createCustomStyle());
    console.log(this._style, this.mainComp, this._name);
    this._attributes = {};
  }

  connectedCallback() {
    this.render();
  }

  createCustomStyle() {
    return null;
  }

  createCustomTemplete() {
    return null;
  }

  handleAttibutes() {
    const attributes = this.getAttributeNames();
    attributes.forEach((attr) => {
      this._attributes[attr] = this.getAttribute(attr);
    });
  }

  render() {
    this.handleAttibutes();
    this.shadowRoot.appendChild(this.mainComp);
    this.shadowRoot.appendChild(this._style);
    return this.shadowRoot;
  }
}
