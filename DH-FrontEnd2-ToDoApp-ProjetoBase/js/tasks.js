const authToken = localStorage.getItem('userToken');
const finishSessionRef = document.querySelector('#closeApp');
const userNameRef = document.querySelector('#userName');
const taskRef = document.querySelector('#novaTarefa');
const buttontaskRef = document.querySelector('#criarTarefa');

var userTask = {

    description: '',
    completed: false

};

function validateTask(task){

    userTask.description = task;

    console.log(userTask)
}

taskRef.addEventListener('keyup',(event) => validateTask(event.target.value))


const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
}



function logout() {
    window.location.href = './index.html';
    localStorage.clear();
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


finishSessionRef.addEventListener('click', () => logout());


function verificaToken (){

    if (authToken===null) {

        logout() 
        alert('Usuário não logado') 
    }

    else {

        getUserData();
    }
}

verificaToken()

function criarTarefa (event){

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

buttontaskRef.addEventListener('click',(event) => criarTarefa(event))