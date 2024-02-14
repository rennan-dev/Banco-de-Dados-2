firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userName = user.displayName || 'Nome do Usuário';
        
        // Recupere o tipo de conta do banco de dados
        firebase.database().ref('usuarios/' + user.uid + '/tipo_conta').once('value')
            .then((snapshot) => {
                const userAccountType = snapshot.val() || 'Tipo de Conta';
                console.log(userName, userAccountType);
                document.getElementById('user-name').textContent = userName;
                document.getElementById('user-account-type').textContent = userAccountType;
            })
            .catch((error) => {
                console.error('Erro ao recuperar tipo de conta:', error);
            });
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../login.html";
    })
}