const formReceberChave = document.querySelector("#receber-chave");

formReceberChave.addEventListener("submit", function(event) {
    event.preventDefault();

    const sala = document.querySelector("#sala").value;
    const bloco = document.querySelector("#bloco").value;

    // Verificar se a chave está na Guarita antes de receber
    verificarChaveNaGuarita(sala, bloco);
});

// Função para verificar se a chave está na Guarita
function verificarChaveNaGuarita(sala, bloco) {
    firebase.database().ref('laboratorios')
        .orderByChild('sala')
        .equalTo(sala)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const laboratorio = snapshot.val()[Object.keys(snapshot.val())[0]];
                if (laboratorio.portadorChaves === "Guarita") {
                    alert('A chave já está na Guarita. Não é possível receber novamente.');
                } else {
                    // Se a chave não estiver na Guarita, pode receber
                    receberChave(sala, bloco);
                }
            } else {
                alert('Sala não encontrada no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao verificar a sala:', error);
            alert('Erro ao receber a chave. Por favor, tente novamente.');
        });
}

// Função para receber a chave
function receberChave(sala, bloco) {
    // Atualizar o portadorChaves para Guarita
    firebase.database().ref('laboratorios')
        .orderByChild('sala')
        .equalTo(sala)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const laboratorioId = Object.keys(snapshot.val())[0];
                firebase.database().ref('laboratorios/' + laboratorioId).update({
                    portadorChaves: "Guarita"
                }).then(() => {
                    alert('Chave recebida com sucesso pela Guarita.');
                    formReceberChave.reset();
                }).catch((error) => {
                    console.error('Erro ao atualizar o portadorChaves:', error);
                    alert('Erro ao receber a chave. Por favor, tente novamente.');
                });
            } else {
                alert('Sala não encontrada no banco de dados.');
            }
        }).catch((error) => {
            console.error('Erro ao buscar a sala:', error);
            alert('Erro ao receber a chave. Por favor, tente novamente.');
        });
}
