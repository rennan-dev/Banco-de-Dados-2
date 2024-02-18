document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.id;

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