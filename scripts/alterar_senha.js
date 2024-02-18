// No JavaScript
document.getElementById('alterar-senha-link').addEventListener('click', function(event) {
    event.preventDefault(); // Evitar o comportamento padrão de redirecionamento

    const user = firebase.auth().currentUser;

    if (user) {
        firebase.auth().sendPasswordResetEmail(user.email)
            .then(function() {
                alert('Um e-mail de redefinição de senha foi enviado para ' + user.email);
            })
            .catch(function(error) {
                console.error('Erro ao enviar e-mail de redefinição de senha:', error);
                alert('Erro ao enviar e-mail de redefinição de senha. Verifique o console para mais detalhes.');
            });
    } else {
        alert('Nenhum usuário está logado.');
    }
});
