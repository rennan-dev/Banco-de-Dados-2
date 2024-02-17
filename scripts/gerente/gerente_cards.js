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
                case 'desbloquearLaboratorio':
                    window.location.href = 'desbloquear_lab.html';
                    break;
                case 'bloquearLaboratorio':
                    window.location.href = 'bloquear_lab.html';
                    break;
                case 'entregar-chave':
                    window.location.href = 'entregar_chave.html';
                    break;
                case 'receber-chave':
                    window.location.href = "receber_chave.html";
                    break;
                default:
                    break;
            }
        });
    });

    const voltar = document.querySelector('.voltar');
    if(voltar) {
        voltar.addEventListener('click', () => {
            window.location.href = "index.html";
        });
    }
});