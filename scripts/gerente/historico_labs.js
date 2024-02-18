
// Função para buscar e exibir o histórico de chaves do Firebase
function buscarHistoricoChaves() {
    // Referência para o nó "historico_chaves" no banco de dados Firebase
    const ref = firebase.database().ref("historico_chaves");

    // Limpar o conteúdo atual do contêiner de histórico
    const historicoContainer = document.getElementById('resultado-pesquisa');
    historicoContainer.innerHTML = '';

    // Buscar os dados do histórico de chaves
    ref.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            // Obter os dados do registro de histórico de chaves
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

        // Aqui você pode manipular os dados e exibi-los na página conforme necessário
        // Por exemplo, adicionar os dados a uma tabela HTML na página
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
        // Verificar se o contêiner de histórico está disponível antes de adicionar o HTML
        if (historicoContainer) {
            historicoContainer.innerHTML += historicoHTML;
        } else {
            console.error('Contêiner de histórico não encontrado na página.');
        }
    } else {
        console.error('Data de entrega indefinida para o registro de histórico de chaves:', historico);
    }
}




// Event listener para buscar e exibir o histórico de chaves ao carregar a página
window.addEventListener('load', function() {
    buscarHistoricoChaves();
});

/*
// Função para buscar e exibir o histórico de chaves do Firebase com base na data especificada
// Função para buscar e exibir o histórico de chaves do Firebase com base na data especificada
document.addEventListener("DOMContentLoaded", function() {
    // Event listener para o botão de buscar histórico de chaves
    document.getElementById("btn-buscar").addEventListener("click", buscarHistoricoChaves);
});

// Função para buscar e exibir o histórico de chaves do Firebase com base na data especificada
function buscarHistoricoChaves() {
    console.log("Função buscarHistoricoChaves() chamada."); // Verificar se a função está sendo chamada corretamente

    // Obter a data específica fornecida pelo usuário
    const dataEspecifica = document.getElementById("data-pesquisar").value;
    console.log("Data especificada pelo usuário:", dataEspecifica); // Verificar se a data está sendo obtida corretamente

    // Verificar se a data foi fornecida
    if (dataEspecifica) {
        // Referência para o nó "historico_chaves" no banco de dados Firebase
        const ref = firebase.database().ref("historico_chaves");

        // Limpar o conteúdo atual do contêiner de histórico
        const historicoContainer = document.getElementById('resultado-pesquisa');
        historicoContainer.innerHTML = '';

        // Buscar os dados do histórico de chaves com base na data especificada
        ref.once("value", function(snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function(childSnapshot) {
                    // Obter os dados do registro de histórico de chaves
                    const historico = childSnapshot.val();
                    console.log("Dados do registro de histórico de chaves:", historico); // Verificar os dados do registro de histórico de chaves

                    // Extrair a parte da data sem a hora e os minutos
                    const dataEntregaParte = historico.dataEntrega.split(',')[0];
                    // Verificar se a data do histórico corresponde à data especificada
                    if (dataEntregaParte === dataEspecifica) {
                        // Exibir os dados na página
                        exibirHistoricoChaves(historico);
                    }
                });
            } else {
                // Se não houver dados encontrados, exibir uma mensagem de aviso
                const mensagem = document.createElement('p');
                mensagem.textContent = "Nenhum registro de histórico de chaves encontrado para a data especificada.";
                historicoContainer.appendChild(mensagem);
            }
        });
    } else {
        // Se o usuário não fornecer uma data, exibir uma mensagem de aviso
        alert("Por favor, insira uma data específica.");
    }
}


// Função para exibir um registro de histórico de chaves na página
function exibirHistoricoChaves(historico) {
    // Formatar a data para o estilo desejado
    const dataFormatada = historico.dataEntrega;

    // Aqui você pode manipular os dados e exibi-los na página conforme necessário
    // Por exemplo, adicionar os dados a uma tabela HTML na página
    const historicoContainer = document.getElementById('resultado-pesquisa');
    if (historicoContainer) {
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
        historicoContainer.innerHTML += historicoHTML;
    } else {
        console.error('Contêiner de histórico não encontrado na página.');
    }
}
*/
