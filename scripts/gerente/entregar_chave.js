// Capturando o formulário
const formEntregarChave = document.querySelector("#entregar-chave");

// Adicionando um evento de envio ao formulário
formEntregarChave.addEventListener("submit", function(event) {
    event.preventDefault();

    // Capturando os valores dos campos
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
                        verificarEmail(email, sala);
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
function verificarEmail(email, sala) {
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
                                alert('Chave entregue com sucesso para ' + nomeUsuario);
                                formEntregarChave.reset();
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
            } else {
                alert('E-mail não encontrado no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao verificar o e-mail:', error);
            alert('Erro ao entregar a chave. Por favor, tente novamente.');
        });
}
