function getCurrentTimeInManaus() {
    const manausTime = moment().tz("America/Manaus");
    return manausTime.format("DD/MM/YYYY HH:mm");
}

const formEntregarChave = document.querySelector("#entregar-chave");

formEntregarChave.addEventListener("submit", function(event) {
    event.preventDefault();
    const sala = document.querySelector("#sala").value;
    const bloco = document.querySelector("#bloco").value;
    const email = document.querySelector("#email").value;

    // Verificando a existência da sala, a disponibilidade e o e-mail
    verificarExistenciaESalaDisponivel(sala, bloco, email);
});

// Função para verificar a existência da sala, a disponibilidade e o e-mail
function verificarExistenciaESalaDisponivel(sala, bloco, email) {
    firebase.database().ref('laboratorios')
        .orderByChild('sala')
        .equalTo(sala)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const laboratorio = snapshot.val()[Object.keys(snapshot.val())[0]];
                if (laboratorio.disponibilidade === "Disponível") {
                    if (laboratorio.portadorChaves === "Guarita") {
                        verificarEmail(email, sala, bloco);
                    } else {
                        alert('A chave está com outro usuário. Não é possível entregar a chave.');
                    }
                } else {
                    alert('A sala está ocupada. Não é possível entregar a chave.');
                }
            } else {
                alert('Sala não encontrada no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao verificar a sala:', error);
            alert('Erro ao entregar a chave. Por favor, tente novamente.');
        });
}

// Função para verificar o e-mail
function verificarEmail(email, sala, bloco) {
    // Verificando se o e-mail é o e-mail do admin
    if (email === "rennansouzaalves@gmail.com") {
        alert("O e-mail do administrador não pode ser utilizado para pegar a chave.");
        return;
    }

    firebase.database().ref('usuarios')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const usuario = snapshot.val()[Object.keys(snapshot.val())[0]];
                const nomeUsuario = usuario.nome;
                // Entregar a chave
                entregarChave(email, nomeUsuario, sala, bloco);
            } else {
                alert('E-mail não encontrado no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao verificar o e-mail:', error);
            alert('Erro ao entregar a chave. Por favor, tente novamente.');
        });
}

// Função para entregar a chave e registrar no histórico de chaves
function entregarChave(email, nomeUsuario, sala, bloco) {
    const dataEntrega = getCurrentTimeInManaus(); // Obtém a data e hora atuais

    // Atualizar o portadorChaves para o nome do usuário
    firebase.database().ref('laboratorios')
        .orderByChild('sala')
        .equalTo(sala)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const laboratorioId = Object.keys(snapshot.val())[0];
                firebase.database().ref('laboratorios/' + laboratorioId).update({
                    portadorChaves: nomeUsuario
                }).then(() => {
                    // Registrar no histórico de chaves
                    firebase.database().ref('historico_chaves').push({
                        usuarioEntrega: firebase.auth().currentUser.displayName,
                        usuarioRecebimento: nomeUsuario,
                        sala: sala,
                        bloco: bloco, // Incluindo o bloco da sala
                        dataEntrega: dataEntrega
                    }).then(() => {
                        alert('Chave entregue com sucesso para ' + nomeUsuario);
                        formEntregarChave.reset();
                    }).catch((error) => {
                        console.error('Erro ao registrar no histórico de chaves:', error);
                        alert('Erro ao entregar a chave. Por favor, tente novamente.');
                    });
                }).catch((error) => {
                    console.error('Erro ao atualizar o portadorChaves:', error);
                    alert('Erro ao entregar a chave. Por favor, tente novamente.');
                });
            } else {
                alert('Sala não encontrada no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao buscar a sala:', error);
            alert('Erro ao entregar a chave. Por favor, tente novamente.');
        });
}
