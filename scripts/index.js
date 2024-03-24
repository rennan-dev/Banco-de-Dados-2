var botaoEntrar = document.getElementById("botaoEntrar");
botaoEntrar.addEventListener("click", login);

function login(event) {
    showLoading();

    event.preventDefault(); // Evita que o formulário seja submetido normalmente

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Verificar se é o email e senha do administrador
    if (email === "rennansouzaalves@gmail.com" && password === "123123") {
        localStorage.setItem('adminUserId', 'admin');
        // Redirecionar diretamente para a página do administrador
        window.location.href = "../pages/admin/index.html";
        return; // Encerrar a função para evitar a execução do restante do código
    }

    // Se não for o administrador, realizar o login normalmente
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            // Após o login bem-sucedido, recuperar o usuário autenticado
            var user = response.user;

            // Armazenar o ID do usuário no localStorage
            localStorage.setItem('currentUserId', user.uid);

            // Recupere o tipo de conta do banco de dados
            firebase.database().ref('usuarios/' + user.uid + '/tipo_conta').once('value')
                .then((snapshot) => {
                    const userAccountType = snapshot.val() || 'default';

                    // Redireciona o usuário para a página correspondente ao tipo de conta
                    switch (userAccountType) {
                        case "docente":
                            window.location.href = "../pages/gerente/index.html";
                            break;
                        case "discente":
                            window.location.href = "../pages/usuario/index.html";
                            break;
                        default:
                            // Se o tipo de conta não for reconhecido, redireciona para uma página de erro ou página padrão
                            window.location.href = "default_page.html";
                    }
                })
                .catch((error) => {
                    console.error('Erro ao recuperar tipo de conta:', error);
                });
        })
        .catch(error => {
            hideLoading();
            alert(getErrorMessage(error));
        });
}


function getErrorMessage(error) {
    if(error.code == "auth/user-not-found") {
        return "Usuário não encontrado";
    }
    return error.message;
}

function recoverPassword() {
    showLoading();

    var email = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(email).then(() => {
        hideLoading();
        alert('Email de recuperação de senha enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
