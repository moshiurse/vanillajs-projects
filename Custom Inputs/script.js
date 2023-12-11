let password = document.getElementById('pass');
let toggle = document.querySelector('.floatingpass .eye');

function showHide() {
    if(password.type == 'text'){
        password.setAttribute('type', 'password');
        toggle.classList.remove('hide')
    }else{
        password.setAttribute('type', 'text')
        toggle.classList.add('hide')
    }
}