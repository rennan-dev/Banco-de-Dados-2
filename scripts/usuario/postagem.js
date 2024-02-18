// Função para obter a data e hora atual em Manaus, AM e formatá-la
function getCurrentTimeInManaus() {
    // Definir o fuso horário para Manaus, AM
    const manausTime = moment().tz("America/Manaus");
    // Formatar a data e hora no formato desejado
    return manausTime.format("DD/MM/YYYY HH:mm");
}

// Função para postar uma mensagem e exibir todas as postagens
function postarEMostrarPostagens() {
    const postContent = document.getElementById("post-content").value;
    const userName = firebase.auth().currentUser.displayName;
    const postTime = getCurrentTimeInManaus(); // Obter a data e hora atual em Manaus, AM formatada

    // Enviar a postagem para o banco de dados
    firebase.database().ref("posts").push({
        author: userName,
        content: postContent,
        timestamp: postTime
    }).then(function() {
        console.log("Postagem enviada com sucesso!");
        // Limpar o campo de texto após a postagem ser enviada
        document.getElementById("post-content").value = "";
        // Após a postagem ser enviada com sucesso, buscar e mostrar as postagens atualizadas
        mostrarTodasPostagens();
    }).catch(function(error) {
        console.error("Erro ao enviar a postagem:", error);
    });
}

// Função para mostrar todas as postagens
function mostrarTodasPostagens() {
    firebase.database().ref("posts").once("value", function(snapshot) {
        const postagens = [];
        snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            postagens.push({
                usuario: childData.author,
                conteudo: childData.content,
                dataHora: childData.timestamp
            });
        });
        // Ordenar as postagens da mais recente para a mais antiga
        postagens.sort((a, b) => (new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()));
        mostrarPostagens(postagens);
    });
}

// Função para exibir as postagens no contêiner especificado
function mostrarPostagens(postagens) {
    const postagensContainer = document.getElementById('postagens-container');
    postagensContainer.innerHTML = ''; // Limpar o conteúdo atual das postagens

    // Iterar sobre as postagens de trás para frente e criar elementos HTML para cada uma
    for (let i = postagens.length - 1; i >= 0; i--) {
        const postagem = postagens[i];
        const postagemHTML = `
            <div class="postagem">
                <div class="info">
                    <span class="usuario">${postagem.usuario}</span>
                    <span class="data">${postagem.dataHora}</span>
                </div>
                <p>${postagem.conteudo}</p>
            </div>
        `;
        // Adicionar a postagem ao início do container
        postagensContainer.innerHTML += postagemHTML;
    }
}

// Event listener para o botão de publicar
document.getElementById("btn-post").addEventListener("click", postarEMostrarPostagens);

// Chamada inicial para mostrar todas as postagens ao carregar a página
mostrarTodasPostagens();

// Função para carregar mais postagens conforme o usuário rola a página para baixo
window.addEventListener('scroll', function() {
    // Verificar se o usuário está próximo do final da página
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        // Chamar a função para carregar mais postagens
        carregarMaisPostagens();
    }
});

// Função para carregar mais postagens
function carregarMaisPostagens() {
    firebase.database().ref("posts").once("value", function(snapshot) {
        const postagens = [];
        snapshot.forEach(function(childSnapshot) {
            const childData = childSnapshot.val();
            postagens.push({
                usuario: childData.author,
                conteudo: childData.content,
                dataHora: childData.timestamp
            });
        });
        // Ordenar as postagens da mais recente para a mais antiga
        postagens.sort((a, b) => (new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()));
        mostrarPostagens(postagens);
    });
}
