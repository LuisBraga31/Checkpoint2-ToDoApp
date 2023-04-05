/* 01 - Variáveis */

const authToken = localStorage.getItem('userToken');
const finishSessionRef = document.querySelector('#closeApp');
const userNameRef = document.querySelector('#userName');
const taskRef = document.querySelector('#novaTarefa');
const buttontaskRef = document.querySelector('#criarTarefa');

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
}

var userTask = {

    description: '',
    completed: false

};

/* 02 - Funções */

function logout() {
    window.location.href = './index.html';
    localStorage.clear();
}

function verificaToken () {

    if (authToken===null) {

        logout(); 
        alert('O usuário não esta logado. Voce será redirecionado a tela inicial!'); 
    }

    else {

        getUserData();
    }
}

function validateDescription(task) {

    userTask.description = task;

}


function getUserData() {

    var requestConfig = {
        method: 'GET',
        headers: requestHeaders
    }

    fetch('https://todo-api.ctd.academy/v1/users/getMe', requestConfig).then(
        response => {
            
            response.json().then(
                data => {
                    var name = data.firstName + ' ' + data.lastName;
                    userNameRef.innerText = name;
                }
            )
            if(response.ok) {
                console.log('Ok');
            }  
        }
    )
}

function criarTarefa (event) {

    event.preventDefault();

    var requestConfig = {
        method: 'POST',
        headers: requestHeaders,
	    body: JSON.stringify(userTask)

    }

    fetch('https://todo-api.ctd.academy/v1/tasks', requestConfig).then(
        response => {
            if (response.ok){
                console.log('tarefa criada')
            }
        }
    )


}

/* 03 - Eventos */

taskRef.addEventListener('keyup',(event) => validateDescription(event.target.value));

buttontaskRef.addEventListener('click',(event) => criarTarefa(event));
finishSessionRef.addEventListener('click', () => logout());


/* 04 - Invocando Função */

verificaToken();