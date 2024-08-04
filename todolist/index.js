const TODO_SELECTORS = {
  container: "#toDoListContainer",
  addButton: "#toDoListAddItemButton",
  item: ".toDoListItem",
};

class ToDoList {
  constructor() {
    this.container = document.querySelector(TODO_SELECTORS.container);
    this.addButton = document.querySelector(TODO_SELECTORS.addButton);

    if (!this.container || !this.addButton) {
      throw new Error("Required DOM elements not found");
    }

    this.addButton.addEventListener("click", this.addItem.bind(this));
    this.container.addEventListener("click", this.handleItemEvent.bind(this));
  }

  createItemTemplate() {
    const template = document.createElement("div");
    template.className = "toDoListItem";
    template.innerHTML = `
        <input type="checkbox"> 
        <input type="text" placeholder="Type list item">
        <button>-</button>
      `;
    return template;
  }

  addItem() {
    const item = this.createItemTemplate();
    this.container.appendChild(item);
  }

  handleItemEvent(event) {
    const item = event.target.closest(TODO_SELECTORS.item);
    if (!item) return;

    if (event.target.tagName === "BUTTON") {
      this.container.removeChild(item);
    } else if (event.target.type === "checkbox") {
      this.toggleStrikeThrough(item);
    }
  }

  toggleStrikeThrough(item) {
    const checkbox = item.querySelector('input[type="checkbox"]');
    const input = item.querySelector('input[type="text"]'); 
    input.style.textDecoration = checkbox.checked ? "line-through" : "";
  }
}

document.addEventListener("DOMContentLoaded", () => new ToDoList());
