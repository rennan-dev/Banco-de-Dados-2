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

    // Envie os dados para o Firebase Realtime Database
    database.ref('laboratorios').push({
        sala: sala,
        bloco: bloco
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
});