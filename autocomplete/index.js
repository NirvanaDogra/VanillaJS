let input = document.getElementById("input")
let autocomplete = document.getElementById("autocomplete")
let preList = []
let listAr =  []
autocomplete.classList.add("hidden")

function getAutocompleteParamList() {
    try {
        return input.getAttribute("autocompleteList").split(",")
    } catch(error) {
        console.error(error)
    }
}

function arrayEquals(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) return false;

    // Check if all elements are equal
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

function filterAutocompleteParamList(typedText, autocompleteList) {
    let filterList = autocompleteList.filter(it => {
        return it.includes(typedText)
    })

    if (arrayEquals(preList, filterList)) {
        console.log("equal")
        return []
    }

    preList = filterList;
    return filterList
}

function createAutoCompleteList(list) {
    console.log(list, listAr)
    if(list.length===0){
        return 
    }
    for(let i=0 ; i<list.length; i++) {
        listAr[i].innerText = list[i]
    } 
    for(let i = list.length; i<listAr.length; i++) {
        listAr[i].innerText =""
    } 
    console.log(listAr)  
}

function show() {
    autocomplete.classList = ["show"]
}
function hide() {
    autocomplete.childNodes = []
    autocomplete.classList = ["hidden"]
}

function handleEventListener(event) {

    if(event.target.value.trim() == "") {
        console.log("hide")
        hide()
        return;
    }
    console.log("show")
    let filterList = filterAutocompleteParamList(event.target.value, getAutocompleteParamList())
    console.log(filterList)
    createAutoCompleteList(filterList)
    show()
}


getAutocompleteParamList().forEach(it => {
    const element = document.createElement("div")
    autocomplete.appendChild(element)
    listAr.push(element)
})

input.addEventListener("input", handleEventListener)
