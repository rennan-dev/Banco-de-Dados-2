document.addEventListener('DOMContentLoaded', function() {
    const listaLaboratorios = document.getElementById('lista-laboratorios');

    // Carregar laboratórios cadastrados
    firebase.database().ref('laboratorios').on('value', snapshot => {
        listaLaboratorios.innerHTML = ''; // Limpar a lista antes de adicionar os laboratórios novamente
        snapshot.forEach(childSnapshot => {
            const lab = childSnapshot.val();
            const li = document.createElement('li');
            const laboratorioInfo = document.createElement('div');
            laboratorioInfo.textContent = `Sala: ${lab.sala}, Bloco: ${lab.bloco}`;
            laboratorioInfo.classList.add('laboratorio-info'); // Adiciona a classe laboratorio-info
            const disponibilidade = document.createElement('div');
            disponibilidade.textContent = lab.disponibilidade;
            disponibilidade.classList.add('disponibilidade'); // Adiciona a classe disponibilidade
            
            li.appendChild(laboratorioInfo);
            if (lab.disponibilidade === 'Disponível') {
                disponibilidade.classList.add('disponivel');
                // Verifica se há um portador de chaves e adiciona a informação
                if (lab.portadorChaves) {
                    const portadorChavesInfo = document.createElement('div');
                    portadorChavesInfo.textContent = `${lab.portadorChaves}`;
                    portadorChavesInfo.classList.add('portador-chaves');
                    li.appendChild(portadorChavesInfo);
                }
            } else {
                disponibilidade.classList.add('indisponivel');
            }
            li.appendChild(disponibilidade);
            listaLaboratorios.appendChild(li);
        });
    });
});
