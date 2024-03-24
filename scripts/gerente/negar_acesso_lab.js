document.getElementById("botao-negar-lab").addEventListener("click", negarAcesso);

function negarAcesso(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    var sala = document.getElementById('sala').value;
    var bloco = document.getElementById('bloco').value;
    var email = document.getElementById('email').value;

    // Referência ao nó "acesso_chave"
    var acessoChaveRef = firebase.database().ref('acesso_chave');

    // Realiza a consulta para encontrar a entrada correspondente
    acessoChaveRef.once("value", function(snapshot) {
        var entryFound = false;
        snapshot.forEach(function(childSnapshot) {
            var acesso = childSnapshot.val();
            if (acesso.sala === sala && acesso.bloco === bloco && acesso.email === email) {
                // Chave do registro a ser removido
                var chaveRemover = childSnapshot.key;
                
                // Remover o registro do acesso_chave
                acessoChaveRef.child(chaveRemover).remove()
                    .then(function() {
                        console.log("Acesso negado removido com sucesso!");
                        alert("Acesso negado removido com sucesso!");
                    })
                    .catch(function(error) {
                        console.error("Erro ao remover acesso negado:", error);
                        alert("Erro ao remover acesso negado.");
                    });
                    
                entryFound = true;
            }
        });

        if (!entryFound) {
            console.log("Nenhuma entrada encontrada com os critérios fornecidos.");
            alert("Nenhuma entrada encontrada com os critérios fornecidos.");
        }
    });
}
