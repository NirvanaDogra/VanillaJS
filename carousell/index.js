
const template = document.createElement("template");
template.innerHTML = `
    <div style="display: flex; flex: 1; flex-direction: column;">
    </div>
`
const imgTemplate = document.createElement("template");
imgTemplate.innerHTML = `<img style="width:100%; height: 300px;">`

const navTemplete = document.createElement("template");
navTemplete.innerHTML = ` 
    <div style="display: flex; flex-direction:row;">
        <button id="carousellLeft" style="flex:1;">Left</button>
        <button id="carousellRight" style="flex:1;">Right</button>
    </div>
`

const sampleImage = [
    "https://via.placeholder.com/150/0000FF/808080 ?Text=PAKAINFO.com",
    "https://via.placeholder.com/150/FF0000/FFFFFF?Text=yttags.com",
    "https://via.placeholder.com/150/FFFF00/000000?Text=google.com",
    "https://via.placeholder.com/150/000000/FFFFFF/?text=y2meta.com"
]

export default class Carousell extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode:"open"})
        this.viewPoolSize = sampleImage.length
        this.viewPool = []
        this.current = 0
        this.changeTimer = 3000

        this.attach = this.attach.bind(this)
        this.handleLeftNav = this.handleLeftNav.bind(this)
        this.handleRightNav = this.handleRightNav.bind(this)
    }

    connectedCallback() {
        this.initViewPool()
        this.bindViewPool()
        this.attach()
        this.setTimer()
    }

    disconnectedCallback() {
        // Clean up timers and event listeners
        clearTimeout(this.timer);
        this.shadowRoot.getElementById("carousellLeft").removeEventListener("click", this.handleLeftNav);
        this.shadowRoot.getElementById("carousellRight").removeEventListener("click", this.handleRightNav);
    }

    initViewPool() {
        for(let i=0; i<this.viewPoolSize; i++) {
            const element = document.createElement("img")
            
            this.viewPool.push(element)
        }

        console.log("init view pool", this.viewPool)
    }


    bindViewPool() {
        for(let i=0; i<this.viewPoolSize; i++) {
            this.viewPool[i].src = sampleImage[i]
        }
        console.log("binded view pool", this.viewPool)
    }

    attach() {
        console.log("attch")
        this.shadowRoot.appendChild(this.viewPool[this.current])
        this.shadowRoot.appendChild(navTemplete.content.cloneNode(true))
        const left = this.shadowRoot.getElementById("carousellLeft")

        left.addEventListener("click", this.handleLeftNav)
        console.log(left)
        const right = this.shadowRoot.getElementById("carousellRight")
        right.addEventListener("click", this.handleRightNav)
        console.log(right)

        console.log(this.shadowRoot)
    }

    setTimer() {
        setTimeout(() => {
            this.handleRightNav()
            this.setTimer()
        }, this.changeTimer)
    }

    replaceChild(currentNode, nextNodeLoc) {
        this.shadowRoot
        console.log(this.shadowRoot, currentNode, this.viewPool[nextNodeLoc])
        this.shadowRoot.replaceChild(this.viewPool[nextNodeLoc], currentNode)
    }

    handleLeftNav() {
        console.log("left")
        if(this.current == 0) {
            this.replaceChild(this.viewPool[this.current], sampleImage.length-1)
            this.current = sampleImage.length-1
        } else {
            this.replaceChild(this.viewPool[this.current],  this.current-1)
            this.current -=1
        }
    }

    handleRightNav() {
        console.log("click")
        this.replaceChild(this.viewPool[this.current], (this.current +1)%sampleImage.length)
        this.current = (this.current +1)%sampleImage.length
        
    }
} 


window.customElements.define("custom-carousell", Carousell)