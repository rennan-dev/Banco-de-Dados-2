document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('desbloquear-lab');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        const sala = document.getElementById('sala').value;
        const bloco = document.getElementById('bloco').value;

        // Verifica se os campos não estão vazios
        if (sala.trim() === '' || bloco.trim() === '') {
            alert('Por favor, preencha todos os campos antes de enviar o formulário.');
        } else {
            // Busca o laboratório com base na sala e bloco fornecidos
            firebase.database().ref('laboratorios').orderByChild('sala').equalTo(sala).once('value')
            .then(snapshot => {
                let laboratorioEncontrado = false;
                snapshot.forEach(childSnapshot => {
                    const lab = childSnapshot.val();
                    if (lab.bloco === bloco) {
                        laboratorioEncontrado = true;
                        // Verifica se o laboratório já está disponível
                        if (lab.disponibilidade === 'Disponível') {
                            alert('Este laboratório já está disponível.');
                        } else {
                            // Atualiza o status de disponibilidade para 'Disponível'
                            childSnapshot.ref.update({
                                disponibilidade: 'Disponível'
                            })
                            .then(() => {
                                alert('Laboratório desbloqueado com sucesso!');
                                form.reset(); // Limpa o formulário
                            })
                            .catch(error => {
                                console.error('Erro ao desbloquear laboratório:', error);
                                alert('Erro ao desbloquear laboratório. Verifique o console para mais detalhes.');
                            });
                        }
                    }
                });
                if (!laboratorioEncontrado) {
                    alert('Laboratório não encontrado. Verifique os valores inseridos.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar laboratório:', error);
                alert('Erro ao buscar laboratório. Verifique o console para mais detalhes.');
            });
        }
    });
});
