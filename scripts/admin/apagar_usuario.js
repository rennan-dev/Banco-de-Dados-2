document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-excluir-usuario');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        const email = document.getElementById('email').value;

        // Verifica se o campo de e-mail não está vazio
        if (email.trim() === '') {
            alert('Por favor, insira o e-mail do usuário que deseja excluir.');
        } else {
            // Consulta o nó 'usuarios' para encontrar o usuário com o e-mail fornecido
            firebase.database().ref('usuarios').orderByChild('email').equalTo(email).once('value')
                .then(snapshot => {
                    const userToDelete = snapshot.val(); // Obtém o usuário a ser excluído

                    if (userToDelete) {
                        const userId = Object.keys(userToDelete)[0]; // Obtém o ID do usuário a ser excluído

                        // Exclui o usuário encontrado do banco de dados
                        firebase.database().ref('usuarios/' + userId).remove()
                            .then(() => {
                                // Agora excluímos o usuário da autenticação
                                firebase.auth().signInWithEmailAndPassword(email, userToDelete[userId].password)
                                    .then(() => {
                                        const user = firebase.auth().currentUser;
                                        user.delete()
                                            .then(() => {
                                                alert('Usuário excluído com sucesso!');
                                                form.reset();
                                            })
                                            .catch(error => {
                                                console.error('Erro ao excluir usuário da autenticação:', error);
                                                alert('Erro ao excluir usuário da autenticação. Verifique o console para mais detalhes.');
                                            });
                                    })
                                    .catch(error => {
                                        console.error('Erro ao entrar com o usuário para excluir:', error);
                                        alert('Erro ao entrar com o usuário para excluir. Verifique o console para mais detalhes.');
                                    });
                            })
                            .catch(error => {
                                console.error('Erro ao excluir usuário do banco de dados:', error);
                                alert('Erro ao excluir usuário do banco de dados. Verifique o console para mais detalhes.');
                            });
                    } else {
                        alert('Usuário não encontrado com o e-mail fornecido.');
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar usuário:', error);
                    alert('Erro ao buscar usuário. Verifique o console para mais detalhes.');
                });
        }
    });
});
