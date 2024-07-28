const form = document.getElementById("form")
const userName = document.getElementById("username")
const password1 = document.getElementById("password1")
const password2 = document.getElementById("password2")
const email = document.getElementById("email")

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-item error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSucess(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-item sucess';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
 
const isEmpty = (str) => {
    if(str === null || str.value.trim().length === 0) {
        return true
    }
}
function isRequired(arguments) {
    arguments.forEach((it) => {
        if(isEmpty(it)) {
            showError(it, "error")
            return false
        } else {
            showSucess(it, "validated")

        }
    })
    return true 
}

function checkLength(field, min, max) {
    if(field.value.length > max || field.value.length<=min) {
        showError(field, `The allowed lenght is ${min} and ${max}`)
        return false
    }
    return true
}

function checkEquals(password1, password2) {
    if(password1.value !== password2.value) {
        showError(password2, "Password are not matching")
        return false
    }
    return true
}

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if(isRequired([userName, password1, password2, email]) && checkLength(userName, 3, 4) && checkLength(password1, 3, 4) && checkEquals(password1, password2)) {
        alert("this is a valid form")
    }
})