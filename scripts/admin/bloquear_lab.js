document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bloquear-lab');

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
                        // Verifica se a chave está na "Guarita" antes de bloquear o laboratório
                        if (lab.portadorChaves === 'Guarita') {
                            if (lab.disponibilidade === 'Disponível') {
                                // Atualiza a disponibilidade para 'Indisponível'
                                childSnapshot.ref.update({ disponibilidade: 'Indisponível' })
                                .then(() => {
                                    alert('Laboratório bloqueado com sucesso!');
                                    form.reset();
                                })
                                .catch(error => {
                                    console.error('Erro ao bloquear laboratório:', error);
                                    alert('Erro ao bloquear laboratório. Verifique o console para mais detalhes.');
                                });
                            } else {
                                alert('O laboratório já está bloqueado.');
                            }
                        } else {
                            alert('A chave do laboratório não está na "Guarita". Não é possível bloquear o laboratório.');
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
