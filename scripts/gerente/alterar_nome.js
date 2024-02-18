document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-novo-nome');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        const novoNome = document.getElementById('novo-nome').value;

        // Atualiza o nome do usuário no banco de dados do Firebase
        firebase.database().ref('usuarios').child(firebase.auth().currentUser.uid).update({ nome: novoNome })
            .then(() => {
                alert('Nome atualizado com sucesso!');
                form.reset();
            })
            .catch(error => {
                console.error('Erro ao atualizar nome:', error);
                alert('Erro ao atualizar nome. Verifique o console para mais detalhes.');
            });
    });
});
