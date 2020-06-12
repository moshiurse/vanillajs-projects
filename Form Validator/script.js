const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const conPass = document.getElementById('con_pass');

// Showerror function for input error
function showError(input, msg) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = msg;
}

// ShowSuccess function for validated input
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function getFieldName(input) {
    return input.parentElement.querySelector('label').innerText;
}


// checking required by rafactoring all messy code
function checkRequired(inputArray){
    inputArray.forEach(input => {
        if(input.value.trim() === ""){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    });
}

// check Length for the input
function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than or equal ${max} characters`);
    }else{
        showSuccess(input);
    }
}

// checking if email is valid or not
function isValidEmail(input) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(pattern.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, `${getFieldName(input)} is not valid`);
    }
}

// check password match
function checkPasswordMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, 'Passwod does not match');
    }
}

document.addEventListener('submit', function (e) {
    e.preventDefault();

    checkRequired([username, email, password, conPass]);
    checkLength(username, 3,10);
    checkLength(password, 5,25);
    isValidEmail(email);
    checkPasswordMatch(password, conPass);
    
})