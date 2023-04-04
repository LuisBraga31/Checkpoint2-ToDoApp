const authToken = localStorage.getItem('userToken');
const finishSessionRef = document.querySelector('#closeApp');
const userNameRef = document.querySelector('#userName');


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

getUserData();
finishSessionRef.addEventListener('click', () => logout());