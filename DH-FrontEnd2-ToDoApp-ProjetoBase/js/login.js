/* 01 - Variáveis */

const userEmailRef = document.querySelector('#inputEmail');
const userSenhaRef = document.querySelector('#inputPassword');
const buttonLoginRef = document.querySelector('#loginButton');

var userLogin = {
    email:'', 
    password:''
}

var formsErrors = {
    inputEmail: true,
    inputPassword: true
}

/* 02 - Funções */

function checkForm() {

    const formErrorsArray = Object.values(formsErrors);
    const formValidacao = formErrorsArray.every(item => item === false);

    buttonLoginRef.disabled = !formValidacao;
    
    if(formValidacao) {
        buttonLoginRef.classList.add('ativado');
    } else {
        buttonLoginRef.classList.remove('ativado');
    }

}

function validateInput(input) {

    const inputValidacao = input.checkValidity();
    const elementFatherRef = input.parentElement;

    if(inputValidacao) {
        elementFatherRef.classList.remove('error');
    } else {
        elementFatherRef.classList.add('error');
    }
    
    formsErrors[input.id] = !inputValidacao;
    console.log(formsErrors);
    checkForm();

}

function validateEmail(email) {
    userLogin.email = email;
}

function validatePassword(password) {
    userLogin.password = password;
}

function login(event) {

    event.preventDefault();

    const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userLogin)
    }

    fetch('https://todo-api.ctd.academy/v1/users/login', requestConfig).then(    
        response => {
            if (response.ok) {
                //console.log('Usuario existe');
                response.json().then(
                    data => {
                        localStorage.setItem('userToken', data.jwt);
                        window.location.href = './tarefas.html';
                    }
                )

            } else {
                console.log('Nao existe');
            }
        }
    );

}

/* 03 - Eventos */

userEmailRef.addEventListener('keyup', () => validateInput(userEmailRef));
userSenhaRef.addEventListener('keyup', () => validateInput(userSenhaRef));

userEmailRef.addEventListener('keyup', (event) => validateEmail(event.target.value));
userSenhaRef.addEventListener('keyup', (event) => validatePassword(event.target.value));

buttonLoginRef.addEventListener('click',(event) => login(event));