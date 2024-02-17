document.addEventListener('DOMContentLoaded', function() {
    // Obtenha uma referência para o formulário de remoção
    const form = document.getElementById('remove-lab');

    // Adicione um ouvinte de evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        // Obtenha os valores dos campos do formulário
        const sala = document.getElementById('sala').value;
        const bloco = document.getElementById('bloco').value;

        // Remova o laboratório do Firebase Realtime Database
        firebase.database().ref('laboratorios').orderByChild('sala').equalTo(sala).once('value')
        .then(snapshot => {
            let labRemovido = false; // Variável para controlar se o laboratório foi removido
            let rennan_Teste = 0;

            snapshot.forEach(childSnapshot => {
                const lab = childSnapshot.val();
                if (lab.bloco === bloco) {
                    rennan_Teste = 1;
                    // Remove o laboratório se for encontrado
                    firebase.database().ref('laboratorios').child(childSnapshot.key).remove()
                    
                    .then(() => {
                        // Limpe o formulário após a remoção bem-sucedida
                        form.reset();
                        alert('Laboratório removido com sucesso!');
                        labRemovido = true; // Define como verdadeiro pois o laboratório foi removido
                    })
                    .catch(error => {
                        console.error('Erro ao remover laboratório:', error);
                        alert('Erro ao remover laboratório. Verifique o console para mais detalhes.');
                    });
                }else {
                    rennan_Teste = -1;
                }
            });

            // Verifica se o laboratório não foi removido e exibe a mensagem de erro, se necessário
            if (rennan_Teste == -1 || rennan_Teste == 0) {
                alert('Laboratório não encontrado para remoção.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar laboratório para remoção:', error);
            alert('Erro ao buscar laboratório para remoção. Verifique o console para mais detalhes.');
        });
    });
});
