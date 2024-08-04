const template = document.createElement("template");
template.innerHTML = `
        <div style="cursor: pointer;">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
`;

class RatingWidget extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.starList = this.shadowRoot.querySelectorAll("div span");
    this.handleClickListener = this.handleClickListener.bind(this);
    this.init();
  }

  init() {
    this.starList.forEach((element, index) => {
      element.index = index;
      element.addEventListener("click", this.handleClickListener);
    });
  }

  handleClickListener(event) {
    const index = event.target.index;
    if (index >= 0) {
      for (let i = 0; i <= index; i++) {
        this.starList[i].style.color = "red";
      }

      for (let i = index + 1; i < this.starList.length; i++) {
        this.starList[i].style.color = "black";
      }

      setTimeout(() => {
        const handleClick = this.getAttribute("handleclick");
        if (handleClick) {
          window[handleClick](event, index);
        }
      }, 0);
    }
  }
}
window.customElements.define("rating-widget", RatingWidget);
