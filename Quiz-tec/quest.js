document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.querySelector('.content h2');
    const botoesOpcoes = document.querySelectorAll('.option-button');
    const botaoProximo = document.querySelector('.next-button');
    const progressoPreencher = document.querySelector('.progress-fill');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;


    function carregarPergunta() {
        fetch('perguntas.json')
            .then(response => response.json())
            .then(data => {
                const pergunta = data.perguntas[perguntaIndex];
                perguntaTitulo.textContent = pergunta.questao;

                botoesOpcoes.forEach((botao, index) => {
                    botao.textContent = pergunta.respostas[index];
                    botao.onclick = () => selecionarResposta(botao, index === pergunta.resposta_certa);
                });

                
                const larguraProgresso = ((perguntaIndex + 1) / data.perguntas.length) * 100;
                progressoPreencher.style.width = `${larguraProgresso}%`;
            })
            .catch(error => console.error('Erro ao carregar perguntas:', error));
    }

   
    function selecionarResposta(botao, estaCorreta) {
        botoesOpcoes.forEach(botao => botao.classList.remove('selecionada'));
        botao.classList.add('selecionada');
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

        if (perguntaIndex >= 5) { 
            localStorage.setItem('acertos', acertos);
            window.location.href = 'resultado.html';
        } else {
            carregarPergunta();
        }
    }

    botaoProximo.addEventListener('click', avancar);
    carregarPergunta();
});
