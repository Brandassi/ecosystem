document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.querySelector('.content h2');
    const botoesOpcoes = document.querySelectorAll('.option-button');
    const botaoProximo = document.querySelector('.next-button');
    const progressoPreencher = document.querySelector('.progress-fill');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;
    let perguntas = []; 

    function carregarPergunta() {
        fetch('perguntas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data.perguntas) || data.perguntas.length === 0) {
                    throw new Error('Dados inválidos ou vazios');
                }

                perguntas = data.perguntas; 
                const pergunta = perguntas[perguntaIndex];
                perguntaTitulo.textContent = pergunta.question;

                botoesOpcoes.forEach((botao, index) => {
                    botao.textContent = pergunta.options[index];
                    botao.onclick = () => selecionarResposta(botao, index === pergunta.correctOption);
                });

                const larguraProgresso = ((perguntaIndex + 1) / perguntas.length) * 100;
                progressoPreencher.style.width = `${larguraProgresso}%`;
            })
            .catch(error => console.error('Erro ao carregar perguntas:', error));
    }

    function selecionarResposta(botaoSelecionado, estaCorreta) {
        botoesOpcoes.forEach(botao => botao.classList.remove('selecionada'));
        botaoSelecionado.classList.add('selecionada');
        respostaSelecionada = estaCorreta;
    }

    function avancar() {
        if (respostaSelecionada === null) {
            alert('Por favor, selecione uma resposta.');
            return;
        }

        if (respostaSelecionada) {
            acertos++;
        }

        respostaSelecionada = null;
        perguntaIndex++;

        if (perguntaIndex >= perguntas.length) { 
            localStorage.setItem('acertos', acertos);
            window.location.href = 'resultado.html';
        } else {
            carregarPergunta();
        }
    }

    botaoProximo.addEventListener('click', avancar);
    carregarPergunta();

    
    window.addEventListener('beforeunload', (event) => {
        if (respostaSelecionada !== null || perguntaIndex > 0) {
            event.preventDefault();
            event.returnValue = '';
        }
    });
});
