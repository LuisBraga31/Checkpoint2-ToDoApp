/* 01 - Variáveis */

const authToken = localStorage.getItem('userToken');
const finishSessionRef = document.querySelector('#closeApp');
const userNameRef = document.querySelector('#userName');
const taskRef = document.querySelector('#novaTarefa');
const buttontaskRef = document.querySelector('#criarTarefa');

const tasksPendetesRef = document.querySelector('.tarefas-pendentes');
const tasksFinalizadasRef = document.querySelector('.tarefas-terminadas');

const requestHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': authToken
}

var userTask = {

    description: '',
    completed: false,
    createdAt: ''

};

let tasksPendentes = [];
let tasksFinalizadas = [];

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
                receberTarefa();
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
                console.log('tarefa criada');
                receberTarefa();
            }
        }
    )


}

function receberTarefa() {

    var requestConfig = {
        method: 'GET',
        headers: requestHeaders
    }

    fetch(`https://todo-api.ctd.academy/v1/tasks`, requestConfig).then(
         response => {
            if (response.ok) {
                response.json().then (
                    tasks => {
                        insertTasks(tasks);
                        console.log(tasks);
                    }
                )
            }

         }
    )
    
}

function finalizarTarefa(target) {

    var userUpdate = {
        completed: true
    }

    var requestConfig = {
        method: 'PUT',
        headers: requestHeaders,
        body: JSON.stringify(userUpdate)
    }

    fetch(`https://todo-api.ctd.academy/v1/tasks/${target}`, requestConfig).then (
        response => {
            if(response.ok) {
                receberTarefa();
                console.log('Atualizou!');
            }
        }
    )

}

function deletarTarefa(target) {
    
    var requestConfig = {
        method: 'DELETE',
        headers: requestHeaders
    }

    fetch(`https://todo-api.ctd.academy/v1/tasks/${target}`, requestConfig).then (
        response => {
            if(response.ok) {
                receberTarefa();
                console.log('Deletou!');
            }
        }
    )
}

function insertTasks(tasks) {

    tasksPendetesRef.innerHTML = " ";
    tasksFinalizadasRef.innerHTML = " ";
    
    tasksPendentes = [];
    tasksFinalizadas = [];

    tasks.map( task => {

        if(task.completed) {
            tasksFinalizadas.push(task);
        } else {
            tasksPendentes.push(task);
        }

    });

    for (let i=0; i < tasksPendentes.length; i++) {
    
        tasksPendetesRef.innerHTML += `
        <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
            <p class="nome"> ${tasksPendentes[i].description}</p>
            <p class="timestamp">Criada em: 15/07/21</p>
            </div>
        </li>
        `
    }

    for (let i=0; i < tasksFinalizadas.length; i++) {
    
        tasksFinalizadasRef.innerHTML += `
        <li class="tarefa">
            <div class="not-done"></div>
            <div class="descricao">
            <p class="nome"> ${tasksFinalizadas[i].description}</p>
            <p class="timestamp">Criada em: 15/07/21</p>
            </div>
        </li>
        `
    }

    /* ====================================== */


    atualizar();
    deletar();

}

function atualizar() {
    let completedTaskRef = Array.from(tasksPendetesRef.children);

    completedTaskRef.map( (item, index) => {

        const clickTask = item.children[0];
        
        clickTask.addEventListener('click', () => finalizarTarefa(tasksPendentes[index].id));
    });
}

function deletar() {
    let deleteTaskRef = Array.from(tasksFinalizadasRef.children);

    deleteTaskRef.map( (item, index) => {

        const clickTask = item.children[0];
        
        clickTask.addEventListener('click', () => deletarTarefa(tasksFinalizadas[index].id));
    });
}


/* 03 - Eventos */

taskRef.addEventListener('keyup',(event) => validateDescription(event.target.value));

buttontaskRef.addEventListener('click',(event) => criarTarefa(event));
finishSessionRef.addEventListener('click', () => logout());


/* 04 - Invocando Função */

verificaToken();
