
// Função para buscar e exibir o histórico de chaves do Firebase
function buscarHistoricoChaves() {
    const ref = firebase.database().ref("historico_chaves");

    // Limpar o conteúdo atual do contêiner de histórico
    const historicoContainer = document.getElementById('resultado-pesquisa');
    historicoContainer.innerHTML = '';

    // Buscar os dados do histórico de chaves
    ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            const historico = childSnapshot.val();
            // Exibir os dados na página
            exibirHistoricoChaves(historico);
        });
    });
}

// Função para exibir um registro de histórico de chaves na página
function exibirHistoricoChaves(historico) {
    // Verificar se a data de entrega está definida
    if (historico.dataEntrega) {
        // Formatar a data para o estilo desejado
        const dataFormatada = historico.dataEntrega;

        const historicoContainer = document.getElementById('resultado-pesquisa');
        const historicoHTML = `
            <div class="historico-item">
                <p>Usuário que entregou: ${historico.usuarioEntrega}</p>
                <p>Usuário que recebeu: ${historico.usuarioRecebimento}</p>
                <p>Sala: ${historico.sala}</p>
                <p>Bloco: ${historico.bloco}</p>
                <p>Data de entrega: ${dataFormatada}</p>
            </div>
            <hr> <!-- Linha separadora -->
        `;
        if (historicoContainer) {
            historicoContainer.innerHTML += historicoHTML;
        } else {
            console.error('Contêiner de histórico não encontrado na página.');
        }
    } else {
        console.error('Data de entrega indefinida para o registro de histórico de chaves:', historico);
    }
}

window.addEventListener('load', function() {
    buscarHistoricoChaves();
});