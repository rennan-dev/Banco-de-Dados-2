// Função para obter a data e hora atual em Manaus, AM
function getCurrentTimeInManaus() {
    // Definir o fuso horário para Manaus, AM
    const manausTime = moment().tz("America/Manaus");
    // Formatar a data e hora no formato desejado
    return manausTime.format("DD/MM/YYYY HH:mm");
}

// Função para postar no banco de dados
document.getElementById("btn-post").addEventListener("click", function() {
    const postContent = document.getElementById("post-content").value;
    const userName = firebase.auth().currentUser.displayName;
    const postTime = getCurrentTimeInManaus(); // Obter a data e hora atual em Manaus, AM

    // Enviar a postagem para o banco de dados
    firebase.database().ref("posts").push({
        author: userName,
        content: postContent,
        timestamp: postTime
    }).then(function() {
        console.log("Postagem enviada com sucesso!");
        // Limpar o campo de texto após a postagem ser enviada
        document.getElementById("post-content").value = "";
    }).catch(function(error) {
        console.error("Erro ao enviar a postagem:", error);
    });
});

// Função para mostrar as postagens
function mostrarPostagens(postagens) {
    const postagensContainer = document.getElementById('postagens-container');
    postagensContainer.innerHTML = ''; // Limpar o conteúdo atual das postagens

    // Iterar sobre as postagens e criar elementos HTML para cada uma
    postagens.forEach(postagem => {
        const postagemHTML = `
            <div class="postagem">
                <div class="info">
                    <span class="usuario">${postagem.usuario}</span>
                    <span class="data">${postagem.dataHora}</span>
                </div>
                <p>${postagem.conteudo}</p>
            </div>
        `;
        postagensContainer.innerHTML += postagemHTML; // Adicionar a postagem ao container
    });
}
