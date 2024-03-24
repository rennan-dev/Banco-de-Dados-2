// Adicionar um listener de autenticação para verificar quando o usuário estiver autenticado
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Recupera a foto de perfil do usuário ao carregar a página
        firebase.database().ref('usuarios').child(user.uid).once('value')
        .then(snapshot => {
            const userData = snapshot.val();
            const fotoPerfilBase64 = userData.fotoPerfilBase64;

            // Define o caminho relativo para a foto de perfil padrão
            const fotoPerfilPadraoURL = '../../img/trabalho-programa.png'; // Substitua pelo caminho relativo da sua imagem

            // Atualiza a foto de perfil exibida na página
            const fotoPerfilElement = document.getElementById('foto-perfil');
            fotoPerfilElement.style.backgroundImage = `url(${fotoPerfilBase64 ? fotoPerfilBase64 : fotoPerfilPadraoURL})`;

            // Recupera o nome do usuário
            const nomeUsuario = userData.nome;

            // Atualiza o nome do usuário exibido na página
            const nomeUsuarioElement = document.getElementById('nome-usuario');
            nomeUsuarioElement.textContent = nomeUsuario;
        })
            .catch(error => {
                console.error('Erro ao obter foto de perfil:', error);
            });

        const form = document.getElementById('form-novo-nome');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o comportamento padrão de envio do formulário

            const novoNome = document.getElementById('novo-nome').value;

            // Atualiza o nome do usuário no banco de dados do Firebase
            firebase.database().ref('usuarios').child(user.uid).update({ nome: novoNome })
                .then(() => {
                    alert('Nome atualizado com sucesso!');
                    location.reload();
                    form.reset();
                })
                .catch(error => {
                    console.error('Erro ao atualizar nome:', error);
                    alert('Erro ao atualizar nome.');
                });
        });

        // Adiciona evento de clique na foto de perfil para permitir a troca de foto
        const fotoPerfil = document.getElementById('foto-perfil');
        fotoPerfil.addEventListener('click', function() {
            const inputNovaFoto = document.getElementById('nova-foto-perfil');
            inputNovaFoto.click(); // Simula o clique no input de nova foto
        });

        // Adiciona evento de alteração para o input de nova foto
        const inputNovaFoto = document.getElementById('nova-foto-perfil');
        inputNovaFoto.addEventListener('change', function(event) {
            event.preventDefault(); // Evita o comportamento padrão de envio do formulário

            const file = inputNovaFoto.files[0]; // A primeira imagem selecionada pelo usuário

            // Ler o conteúdo do arquivo como base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64Image = reader.result;

                // Atualizar a foto de perfil no banco de dados Firebase
                firebase.database().ref('usuarios').child(user.uid).update({ fotoPerfilBase64: base64Image })
                    .then(() => {
                        alert('Foto de perfil atualizada com sucesso!');
                        location.reload();
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar foto de perfil:', error);
                        alert('Erro ao atualizar foto de perfil.');
                    });
            };
        });
    } else {
        console.log('Usuário não autenticado.');
    }
});
