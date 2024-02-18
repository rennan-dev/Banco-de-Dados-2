// Função para buscar o histórico de chaves de um dia específico
function pesquisarHistoricoChaves() {
    // Obter a data específica fornecida pelo usuário
    const dataEspecifica = document.getElementById("data").value;

    // Verificar se a data foi fornecida
    if (dataEspecifica) {
        // Verificar se o usuário é um administrador
        if (localStorage.getItem('adminUserId')) {
            // Consultar o banco de dados para o histórico de chaves na data especificada
            firebase.database().ref("historico_chaves").orderByChild("dataEntrega").startAt(dataEspecifica).endAt(dataEspecifica + "\uf8ff").once("value")
                .then(function(snapshot) {
                    // Verificar se há dados no snapshot
                    if (snapshot.exists()) {
                        // Limpar a lista de histórico de chaves
                        limparHistoricoChaves();

                        // Iterar sobre os registros de histórico de chaves encontrados
                        snapshot.forEach(function(childSnapshot) {
                            // Obter os dados do registro de histórico de chaves
                            const historico = childSnapshot.val();
                            // Exibir os dados na página
                            exibirHistoricoChaves(historico);
                        });
                    } else {
                        // Se não houver dados encontrados, exibir uma mensagem de aviso
                        alert("Nenhum registro de histórico de chaves encontrado para a data especificada.");
                    }
                })
                .catch(function(error) {
                    console.error("Erro ao buscar histórico de chaves:", error);
                    alert("Erro ao buscar o histórico de chaves. Por favor, tente novamente.");
                });
        } else {
            alert("Apenas administradores podem visualizar o histórico.");
        }
    } else {
        // Se o usuário não fornecer uma data, exibir uma mensagem de aviso
        alert("Por favor, insira uma data específica.");
    }
}

// Função para exibir um registro de histórico de chaves na página
function exibirHistoricoChaves(historico) {
    // Aqui você pode manipular os dados e exibi-los na página conforme necessário
    // Por exemplo, adicionar os dados a uma tabela HTML na página
    const historicoContainer = document.getElementById('resultado-pesquisa');
    const historicoHTML = `
        <div class="historico-item">
            <p>Usuário que entregou: ${historico.usuarioEntrega}</p>
            <p>Usuário que recebeu: ${historico.usuarioRecebimento}</p>
            <p>Sala: ${historico.sala}</p>
            <p>Bloco: ${historico.bloco}</p>
            <p>Data de entrega: ${historico.dataEntrega}</p>
        </div>
        <hr> <!-- Linha separadora -->
    `;
    historicoContainer.innerHTML += historicoHTML;
}

// Função para limpar a lista de histórico de chaves na página
function limparHistoricoChaves() {
    // Aqui você pode limpar a lista de registros de histórico de chaves da página
    const historicoContainer = document.getElementById('resultado-pesquisa');
    historicoContainer.innerHTML = '';
}

// Event listener para o botão de buscar histórico de chaves
document.getElementById("btn-buscar").addEventListener("click", pesquisarHistoricoChaves);
