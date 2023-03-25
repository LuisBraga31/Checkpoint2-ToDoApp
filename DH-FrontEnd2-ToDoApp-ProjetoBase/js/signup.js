const registroFirstName = document.querySelector('#itemfirstname');
const registroLastName = document.querySelector('#itemlastname');
const registroEmail = document.querySelector('#itememail');
const registroPassword = document.querySelector('#itempassword');
const registroPassword2 = document.querySelector('#itempassword2');
const registrocadastro = document.querySelector('#eventRegister');

function validaInput (input) {

    const inputValidacao = input.checkValidity();
    const elementFatherRef = input.parentElement;

    if(inputValidacao) {
        elementFatherRef.classList.remove('error');
        console.log('Esta sem erro!');
    } else {
        elementFatherRef.classList.add('error');
        console.log('Esta com erro!');
    }
    
}


registroFirstName.addEventListener('keyup', () => validaInput(registroFirstName));
registroLastName.addEventListener('keyup', () => validaInput(registroLastName));
registroEmail.addEventListener('keyup', () => validaInput(registroEmail));
registroPassword.addEventListener('keyup', () => validaInput(registroPassword));
registroPassword2.addEventListener('keyup', () => validaInput(registroPassword2));


var userData = {

    firstName: '',
    lastName: '',
    email: '',
    password: ''

};

/*
function teste (name,lastName,email,password) {
    userData.firstName = name
    userData.lastName = lastName
    userData.email = email
    userData.password = password

}*/

function validateName (name) {
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
}

registroFirstName.addEventListener('keyup', (event) => validateName(event.target.value)); 
registroLastName.addEventListener('keyup', (event) => validatelastName(event.target.value)); 
registroEmail.addEventListener('keyup', (event) => validateEmail(event.target.value))
registroPassword.addEventListener('keyup', (event) => validatePassword(event.target.value)); 


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

            if(response.ok) {
                alert('Você foi cadastrado');
            } else {
                alert('Erro');
            }
        }
    );
}

registrocadastro.addEventListener('click', (event) => cadastro(event));

