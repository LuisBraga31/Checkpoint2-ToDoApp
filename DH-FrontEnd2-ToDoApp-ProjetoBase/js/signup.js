/* 01 - Variáveis */

const registroFirstName = document.querySelector('#firstName');
const registroLastName = document.querySelector('#lastName');
const registroEmail = document.querySelector('#email');
const registroPassword = document.querySelector('#password');
const registroPassword2 = document.querySelector('#passwordRepeat');
const registrocadastro = document.querySelector('#buttonRegister');

var userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

/* 02 - Funções */

function validateInput (input) {

    const inputValidacao = input.checkValidity();
    const elementFatherRef = input.parentElement;

    if (inputValidacao) {
        elementFatherRef.classList.remove('error');
    } else {
        elementFatherRef.classList.add('error');
    }
    
}

function validateRepeatPassword() {

    const elementFatherPasswordRef = registroPassword2.parentElement; 

    if(registroPassword2.value === registroPassword.value) {
        elementFatherPasswordRef.classList.remove('error');
    } else {
        elementFatherPasswordRef.classList.add('error');
    }

}

function validateRegister(item, event) {
    userData[event.target.id] = item;
}

/*
function validateFirstName (name) {
    userData.firstName = name;
}

function validatelastName (lastname) {
    userData.lastName = lastname;
}

function validateEmail(email) {
    userData.email = email;
}

function validatePassword (password) {
    userData.password = password;
}*/

function cadastro (event) {

    event.preventDefault();

    const requestHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }    

    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(userData)
    }

    fetch('https://todo-api.ctd.academy/v1/users', requestConfig).then(
        response => {

            if (response.ok) {
                alert('Cadastro realizado com Sucesso!');
                window.location.href = './index.html';

            } else {
                alert('Usuário cadastrado');
                console.log(userData);
            }
        }
    );
}

/* 03 - Eventos */

    /* 03.1 - Eventos de Validação */
    
registroFirstName.addEventListener('keyup', () => validateInput(registroFirstName));
registroLastName.addEventListener('keyup', () => validateInput(registroLastName));
registroEmail.addEventListener('keyup', () => validateInput(registroEmail));
registroPassword.addEventListener('keyup', () => validateInput(registroPassword));
registroPassword2.addEventListener('keyup', () => validateInput(registroPassword2));

registroPassword.addEventListener('keyup', () => validateRepeatPassword());
registroPassword2.addEventListener('keyup', () => validateRepeatPassword());

    /* 03.2 - Eventos de Registro */

registroFirstName.addEventListener('keyup', (event) => validateRegister(event.target.value, event)); 
registroLastName.addEventListener('keyup', (event) => validateRegister(event.target.value, event)); 
registroEmail.addEventListener('keyup', (event) => validateRegister(event.target.value, event))
registroPassword.addEventListener('keyup', (event) => validateRegister(event.target.value, event)); 

registrocadastro.addEventListener('click', (event) => cadastro(event));