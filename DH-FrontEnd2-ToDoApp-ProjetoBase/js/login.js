const userEmailRef = document.querySelector('#inputEmail');
const userSenhaRef = document.querySelector('#inputPassword');

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


userEmailRef.addEventListener('keyup', () => validaInput(userEmailRef));
userSenhaRef.addEventListener('keyup', () => validaInput(userSenhaRef));

