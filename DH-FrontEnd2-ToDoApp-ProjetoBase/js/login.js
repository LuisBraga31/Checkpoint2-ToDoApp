const userEmailRef = document.querySelector('#inputEmail');
const userSenhaRef = document.querySelector('#inputPassword');
const buttonLoginRef = document.querySelector('#loginButton');

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

var userLogin = {

    email:'', 
    password:''
}

function validateEmail(email) {
    userLogin.email = email;
}

function validatePassword (password) {
    userLogin.password = password;

    console.log(userLogin)
}

userEmailRef.addEventListener('keyup', () => validaInput(userEmailRef));
userSenhaRef.addEventListener('keyup', () => validaInput(userSenhaRef));
userEmailRef.addEventListener('keyup', (event) => validateEmail(event.target.value))
userSenhaRef.addEventListener('keyup', (event) => validatePassword(event.target.value)); 


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
        console.log(response);
        if(response.ok) {
            console.log('Usuario existe');
            
        } else {
            console.log('Nao existe');
        }
    }
)

}



buttonLoginRef.addEventListener('click',(event)=>login(event))