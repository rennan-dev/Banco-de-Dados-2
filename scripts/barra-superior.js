firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userName = user.displayName || 'Nome do Usuário';
        document.getElementById('user-name').textContent = userName;
    }
});

function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../login.html";
    })
}
