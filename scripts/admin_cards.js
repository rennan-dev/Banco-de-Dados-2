document.addEventListener('DOMContentLoaded', function() {
    
    const cards = document.querySelectorAll('.card');

   
    cards.forEach(card => {
        card.addEventListener('click', () => {
            
            const cardId = card.id;

            
            switch (cardId) {
                case 'adicionarLaboratorio':
                    window.location.href = 'adicionar_laboratorio.html';
                    break;
                case 'removerLaboratorio':
                    window.location.href = 'remover_laboratorio.html';
                    break;
                case 'desbloquearLaboratorio':
                    window.location.href = 'desbloquear_lab.html';
                    break;
                case 'bloquearLaboratorio':
                    window.location.href = 'bloquear_lab.html';
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