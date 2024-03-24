document.addEventListener("DOMContentLoaded", function() {
    const formEntregarChave = document.querySelector("#entregar-chave");

    formEntregarChave.addEventListener("submit", function(event) {
        event.preventDefault();
        const sala = document.querySelector("#sala").value;
        const bloco = document.querySelector("#bloco").value;
        const email = document.querySelector("#email").value;

        // Verificar se o registro do usuário existe na tabela acesso_chave
        verificarExistenciaUsuario(sala, bloco, email);
    });

    // Função para verificar a existência do usuário na tabela acesso_chave
    function verificarExistenciaUsuario(sala, bloco, email) {
        firebase.database().ref('acesso_chave')
            .orderByChild('email')
            .equalTo(email)
            .once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Se o usuário existe na tabela acesso_chave, verificar a disponibilidade da sala
                    verificarDisponibilidadeSala(sala, bloco, email);
                } else {
                    alert('Usuário não encontrado na tabela de acesso à chave.');
                }
            }).catch((error) => {
                console.error('Erro ao verificar o usuário:', error);
                alert('Erro ao verificar o usuário. Por favor, tente novamente.');
            });
    }

    // Função para verificar a disponibilidade da sala na tabela laboratorios
    function verificarDisponibilidadeSala(sala, bloco, email) {
        firebase.database().ref('laboratorios')
            .orderByChild('sala')
            .equalTo(sala)
            .once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const laboratorio = snapshot.val()[Object.keys(snapshot.val())[0]];
                    if (laboratorio.disponibilidade === "Disponível") {
                        // Se a sala está disponível, entregar a chave
                        entregarChave(sala, bloco, email);
                    } else {
                        alert('A sala está ocupada. Não é possível entregar a chave.');
                    }
                } else {
                    alert('Sala não encontrada no banco de dados.');
                }
            }).catch((error) => {
                console.error('Erro ao verificar a sala:', error);
                alert('Erro ao verificar a sala. Por favor, tente novamente.');
            });
    }

 // Função para entregar a chave
function entregarChave(sala, bloco, email) {
    const dataEntrega = getCurrentTimeInManaus(); // Obtém a data e hora atuais

    // Verificar se a chave está na guarita
    firebase.database().ref('laboratorios')
        .orderByChild('sala')
        .equalTo(sala)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const laboratorio = snapshot.val()[Object.keys(snapshot.val())[0]];
                if (laboratorio.portadorChaves === "Guarita") {
                    // Obter o nome do usuário a partir do email
                    firebase.database().ref('usuarios')
                        .orderByChild('email')
                        .equalTo(email)
                        .once('value')
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const usuario = snapshot.val()[Object.keys(snapshot.val())[0]];
                                const nomeUsuario = usuario.nome;

                                // Atualizar o portadorChaves para o nome do usuário
                                firebase.database().ref('laboratorios/' + Object.keys(snapshot.val())[0]).update({
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
                                alert('Nome de usuário não encontrado.');
                            }
                        }).catch((error) => {
                            console.error('Erro ao buscar o nome do usuário:', error);
                            alert('Erro ao entregar a chave. Por favor, tente novamente.');
                        });
                } else {
                    alert('A chave não está na guarita. Não é possível entregar a chave.');
                }
            } else {
                alert('Sala não encontrada no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao buscar a sala:', error);
            alert('Erro ao entregar a chave. Por favor, tente novamente.');
        });
}



    // Função para obter a data e hora atual em Manaus
    function getCurrentTimeInManaus() {
        const manausTime = moment().tz("America/Manaus");
        return manausTime.format("DD/MM/YYYY HH:mm");
    }
});
