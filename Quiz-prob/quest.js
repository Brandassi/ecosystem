document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.getElementById('titulo-pergunta');
    const listaRespostas = document.getElementById('lista-respostas');
    const botaoProximo = document.getElementById('botao-proximo');
    const botaoFechar = document.querySelector('.botao-fechar');
    const progresso = document.querySelector('.progresso');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;
    let perguntas = [];
    let mostrandoResultado = false;
    let indoParaResultados = false;

    function carregarPergunta() {
        if (perguntaIndex >= perguntas.length) {
            localStorage.setItem('acertos', acertos);
            indoParaResultados = true;
            window.location.href = 'resultado.html';
            return;
        }

        const pergunta = perguntas[perguntaIndex];
        perguntaTitulo.textContent = pergunta.question;
        listaRespostas.innerHTML = '';
        respostaSelecionada = null;
        mostrandoResultado = false;

        pergunta.options.forEach((opcao, index) => {
            const li = document.createElement('li');
            li.className = 'resposta';
            li.textContent = opcao;
            li.addEventListener('click', () => selecionarResposta(li, index));
            listaRespostas.appendChild(li);
        });

        progresso.style.width = `${((perguntaIndex + 1) / perguntas.length) * 100}%`;
    }

    function selecionarResposta(elemento, index) {
        const respostas = document.querySelectorAll('.resposta');
        respostas.forEach(resposta => resposta.classList.remove('selecionada'));

        elemento.classList.add('selecionada');
        respostaSelecionada = index;

        // Libera o botão "Próximo" após a seleção
        botaoProximo.disabled = false;
    }

    function mostrarResultado(respostaCertaIndex) {
        const respostas = document.querySelectorAll('.resposta');

        respostas.forEach((resposta, index) => {
            resposta.classList.remove('selecionada');
            if (index === respostaCertaIndex) {
                resposta.classList.add('correta'); // Marca a resposta correta
            } else if (index === respostaSelecionada) {
                resposta.classList.add('incorreta'); // Marca a resposta errada, se errada
            }
        });

        // Bloqueia as respostas para evitar nova interação
        respostas.forEach(resposta => {
            resposta.style.pointerEvents = 'none';
        });

        mostrandoResultado = true;
    }

    function avancar() {
        if (respostaSelecionada === null) {
            alert('Por favor, selecione uma resposta.');
            return;
        }

        if (!mostrandoResultado) {
            const pergunta = perguntas[perguntaIndex];
            mostrarResultado(pergunta.correctOption);

            if (respostaSelecionada === pergunta.correctOption) {
                acertos++;
            }

            // Espera de 1 segundo antes de ir para a próxima pergunta
            setTimeout(() => {
                perguntaIndex++;
                carregarPergunta();
            }, 1000); // 1000 ms = 1 segundo

            return;
        }
    }

    function confirmarSaida() {
        if (!indoParaResultados) {
            const confirmacao = confirm("Você realmente deseja sair do quiz?");
            if (confirmacao) {
                window.location.href = "../index.html";
            }
        }
    }

    // Carregando as perguntas do JSON
    fetch('perguntas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ao tentar carregar perguntas.');
            }
            return response.json();
        })
        .then(data => {
            perguntas = data;
            carregarPergunta();
        })
        .catch(error => {
            console.error('Erro ao carregar perguntas:', error);
            alert('Não foi possível carregar as perguntas.');
        });

    botaoProximo.addEventListener('click', avancar);
    botaoFechar.addEventListener('click', confirmarSaida);

    window.addEventListener('beforeunload', (event) => {
        if (!indoParaResultados && (respostaSelecionada !== null || perguntaIndex > 0)) {
            event.preventDefault();
            event.returnValue = ''; 
        }
    });
});
