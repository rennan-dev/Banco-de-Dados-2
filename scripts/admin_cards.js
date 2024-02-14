document.addEventListener('DOMContentLoaded', function() {
    // Seu código JavaScript aqui
    const cards = document.querySelectorAll('.card');

    // Adicione um ouvinte de evento de clique para cada card
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Obtenha o ID do card clicado
            const cardId = card.id;

            // Execute a ação desejada com base no ID do card
            switch (cardId) {
                case 'adicionarLaboratorio':
                    // Redirecione para a página de adicionar laboratório
                    window.location.href = 'adicionar_laboratorio.html';
                    break;
                case 'removerLaboratorio':
                    // Redirecione para a página de remover laboratório
                    window.location.href = 'remover_laboratorio.html';
                    break;
                default:
                    break;
            }
        });
    });

    const voltar = document.querySelector('.voltar');

    voltar.addEventListener('click', () => {
        window.location.href = "index.html";
    });
});
