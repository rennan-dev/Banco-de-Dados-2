const form = document.querySelector("#form");

// elementos do DOM html
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const accountType = document.querySelector("#accountType");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(nameInput.value === "") {
        alert("Por favor, preencha com seu nome");
        return;
    }

    if(emailInput.value === "" || !isEmailValid(emailInput.value)){
        alert("Por favor, preencha com seu email");
        return;
    }

    switch(validatePassword(passwordInput.value, 6)) {
        case 1: 
            alert("A senha precisa de um tamanho minimo de 6 caracteres");
            return;
            
        case 2: 
            alert("A senha não pode conter espaços");
            return;
    
        default:
            break;
    }

    if(accountType.value === ""){
        alert("Você precisa selecionar a sua situação");
        return;
    }
});

// funcao de validacao do email
function isEmailValid(email){

    //criar um regex para validar o email
    const emailRegex = new RegExp(
        //usuario@host.com.br
        /^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );
    if(emailRegex.test(email)){
        return true;
    }
    return false;
}

// funcao de validacao do senha
function validatePassword(password, minDigits){

    if(password.length >= minDigits){
        
        for(let i=0; i<password.length; i++) {
            if(password[i] === " ") {
                return 2;
            }
        }
        return 0;
    }
    return 1;
}

function register() {
    showLoading();

    const name = nameInput.value; 
    const email = emailInput.value; 
    const password = passwordInput.value; 
    const typeAccount = accountType.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Atualiza o perfil do usuário com o nome
            return user.updateProfile({
                displayName: name
            }).then(() => {
                // Salva os dados do usuário no banco de dados
                const userData = {
                    nome: name,
                    email: email,
                    tipo_conta: typeAccount
                };
                return firebase.database().ref('usuarios/' + user.uid).set(userData);
            });
        })
        .then(() => {
            hideLoading();
            if (typeAccount === 'docente') {
                window.location.href = "../pages/gerente/index.html";
            } else {
                window.location.href = "../pages/usuario/index.html";
            }
        })
        .catch((error) => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}







function getErrorMessage(error) {
    return error.message;
}