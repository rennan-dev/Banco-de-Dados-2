// Adicionar evento de clique ao botão "Permitir Acesso"
document.getElementById("botao-permitir-lab").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de envio do formulário

    // Obter os valores do formulário
    const sala = document.getElementById("sala").value;
    const bloco = document.getElementById("bloco").value;
    const email = document.getElementById("email").value;

    // Verificar se a sala existe na tabela de laboratórios
    firebase.database().ref("laboratorios").orderByChild("sala").equalTo(sala).once("value", function(snapshot) {
        if (snapshot.exists()) {
            // Verificar se o e-mail do usuário existe na tabela de usuários
            firebase.database().ref("usuarios").orderByChild("email").equalTo(email).once("value", function(userSnapshot) {
                if (userSnapshot.exists()) {
                    // Verificar se já existe um acesso para a mesma sala e e-mail na tabela acesso_chave
                    firebase.database().ref("acesso_chave").orderByChild("sala").equalTo(sala).once("value", function(acessoSnapshot) {
                        var acessoExistente = false;
                        acessoSnapshot.forEach(function(childSnapshot) {
                            if (childSnapshot.val().email === email) {
                                acessoExistente = true;
                            }
                        });

                        if (acessoExistente) {
                            console.log("Acesso já concedido para essa sala e e-mail.");
                            alert("Acesso já concedido para essa sala e e-mail.");
                        } else {
                            // Conceder acesso ao laboratório adicionando um novo registro na tabela "acesso_chave"
                            firebase.database().ref("acesso_chave").push({
                                sala: sala,
                                bloco: bloco,
                                email: email
                            }).then(function() {
                                alert("Acesso concedido com sucesso!");
                                // Limpar os campos do formulário após conceder acesso
                                document.getElementById("sala").value = "";
                                document.getElementById("bloco").value = "";
                                document.getElementById("email").value = "";
                            }).catch(function(error) {
                                console.error("Erro ao conceder acesso:", error);
                            });
                        }
                    });
                } else {
                    console.log("E-mail do usuário não encontrado.");
                    alert("E-mail do usuário não encontrado.");
                }
            });
        } else {
            console.log("Sala não encontrada.");
            alert("Sala não encontrada.");
        }
    });
});
