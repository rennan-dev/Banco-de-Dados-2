document.addEventListener('DOMContentLoaded', function() {
    const formApagar = document.getElementById('apagar-user');

    formApagar.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        const user = firebase.auth().currentUser;

        // Confirmar se o usuário realmente deseja excluir sua conta
        const confirmarExclusao = confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.");

        if (confirmarExclusao) {
            // Apagar dados do usuário do Realtime Database
            const userId = user.uid;
            firebase.database().ref('usuarios/' + userId).remove()
                .then(() => {
                    // Se os dados do usuário foram removidos com sucesso, prosseguir com a exclusão da conta de autenticação
                    return user.delete();
                })
                .then(() => {
                    // Se a conta de autenticação foi excluída com sucesso, redirecionar para a página de login
                    alert("Sua conta foi excluída com sucesso.");
                    window.location.href = "../login.html";
                })
                .catch((error) => {
                    // Lidar com erros durante a exclusão da conta ou remoção de dados do banco de dados
                    console.error("Erro ao excluir conta ou remover dados do usuário:", error);
                    alert("Erro ao excluir conta ou remover dados do usuário. Verifique o console para mais detalhes.");
                });
        }
    });
});
