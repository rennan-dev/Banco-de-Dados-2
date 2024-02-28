// Atualize o nome do usuário na página
function atualizarNomeUsuario(nome) {
    const userNameElement = document.getElementById('user-name');
    userNameElement.textContent = nome;
}

// Adicione um ouvinte de autenticação para detectar quando o usuário fizer login
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // Se o usuário estiver autenticado, recupere o nome do usuário do banco de dados e atualize na página
        firebase.database().ref('usuarios/' + user.uid).once('value')
            .then(snapshot => {
                const userData = snapshot.val();
                const nomeUsuario = userData.nome;
                atualizarNomeUsuario(nomeUsuario);
            })
            .catch(error => {
                console.error('Erro ao recuperar o nome do usuário:', error);
            });
    } else {
        atualizarNomeUsuario('');
    }
});


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userName = user.displayName || 'Nome do Usuário';
        document.getElementById('user-name').textContent = userName;
    }else {
        const userName = 'Lab Controle';
        document.getElementById('user-name').textContent = userName;
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../login.html";
    })
}