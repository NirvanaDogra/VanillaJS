const SELECTOR =  {
    container: "container",
    input: "autocomplete-input",
    suggestionsContainer: "autocomplete-suggestions"
}
export default class AutoComplete extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode:"open"})
        this.addEventListener = this.addEventListener.bind(this)
        this.intializeAutoComplete = this.intializeAutoComplete.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.getSuggestionList = this.getSuggestionList.bind(this)

    }

    createTemplate() {
        const template = document.createElement("template");
        template.innerHTML = `
            <style>
                .${SELECTOR.suggestionsContainer} {
                    visibility: hidden;
                }
                .${SELECTOR.suggestionsContainer}.visible {
                    visibility: visible;
                }
            </style>
            <div class="${SELECTOR.container}">
                <input type="text" class="${SELECTOR.input}">
                <div class="${SELECTOR.suggestionsContainer}"></div>
            </div>
        `
        return template.content.cloneNode(true)
    }

    createItemTemplate(info) {
        const template = document.createElement("div");
        template.innerHTML = `${info}`
        return template.cloneNode(true)
    }

    connectedCallback() {
        const item = this.createTemplate()
        this.shadowRoot.appendChild(item)
        this.intializeAutoComplete()
    }

    intializeAutoComplete() {
        const input = this.shadowRoot.querySelector(`.${SELECTOR.input}`);
        input.addEventListener('input', this.handleInput)
    }

    handleInput(event) {
        const suggestionsContainer = this.shadowRoot.querySelector(`.${SELECTOR.suggestionsContainer}`);
        if(event.target.value === '') {
            suggestionsContainer.classList.remove('visible');
            return
        }
        suggestionsContainer.classList.add('visible');  

        suggestionsContainer.innerHTML = ''; 
        this.getSuggestionList().filter((it) => {
            return it.includes(event.target.value)
        }).forEach((it)=> {
            suggestionsContainer.appendChild(this.createItemTemplate(it))
        })   
    }

    getSuggestionList() {
        const list = this.getAttribute('list')
        return list ? list.split(","): []
    }
}

window.customElements.define("auto-complete", AutoComplete)