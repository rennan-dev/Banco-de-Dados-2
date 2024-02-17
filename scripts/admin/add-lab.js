document.addEventListener('DOMContentLoaded', function() {
    // Obtenha uma referência para o banco de dados do Firebase
    const database = firebase.database();

    // Obtenha uma referência para o formulário
    const form = document.getElementById('add-lab');

    // Adicione um ouvinte de evento de envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de envio do formulário

        // Obtenha os valores dos campos do formulário
        const sala = document.getElementById('sala').value;
        const bloco = document.getElementById('bloco').value;

        // Verifique se os campos não estão vazios
        if (sala.trim() === '' || bloco.trim() === '') {
            // Impede o envio do formulário
            event.preventDefault();

            // Exibe uma mensagem de erro para o usuário
            alert('Por favor, preencha todos os campos antes de enviar o formulário.');
        } else {
            // Verifique se a sala já existe dentro do mesmo bloco
            database.ref('laboratorios').orderByChild('bloco').equalTo(bloco).once('value')
                .then(snapshot => {
                    let salaExistente = false;
                    snapshot.forEach(childSnapshot => {
                        const lab = childSnapshot.val();
                        if (lab.sala === sala) {
                            salaExistente = true;
                        }
                    });
                    if (salaExistente) {
                        alert('Sala já existe neste bloco!');
                    } else {
                        // Envie os dados para o Firebase Realtime Database
                        database.ref('laboratorios').push({
                            sala: sala,
                            bloco: bloco,
                            disponibilidade: 'Indisponível', // Definir a disponibilidade como "Indisponível" por padrão
                            portadorChaves: 'Guarita'
                        })
                            .then(() => {
                                // Limpe o formulário após o envio bem-sucedido
                                form.reset();
                                alert('Laboratório adicionado com sucesso!');
                            })
                            .catch(error => {
                                console.error('Erro ao adicionar laboratório:', error);
                                alert('Erro ao adicionar laboratório. Verifique o console para mais detalhes.');
                            });
                    }
                })
                .catch(error => {
                    console.error('Erro ao verificar a existência da sala:', error);
                    alert('Erro ao verificar a existência da sala. Verifique o console para mais detalhes.');
                });
        }
    });
});
