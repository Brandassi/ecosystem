document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.getElementById('question-title');
    const listaRespostas = document.getElementById('answers-list');
    const botaoProximo = document.getElementById('next-button');
    const progresso = document.querySelector('.progress');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;

    function carregarPergunta() {
        fetch('perguntas.json')
            .then(response => response.json())
            .then(data => {
                const pergunta = data.perguntas[perguntaIndex];
                perguntaTitulo.textContent = pergunta.questao;
                listaRespostas.innerHTML = '';

                pergunta.respostas.forEach((resposta, index) => {
                    const li = document.createElement('li');
                    li.className = 'answer';
                    li.textContent = resposta;
                    li.addEventListener('click', () => selecionarResposta(li, index === pergunta.resposta_certa));
                    listaRespostas.appendChild(li);
                });

                const larguraProgresso = ((perguntaIndex + 1) / data.perguntas.length) * 100;
                progresso.style.width = `${larguraProgresso}%`;
            })
            .catch(error => console.error('Erro ao carregar perguntas:', error));
    }

    function selecionarResposta(elemento, estaCorreta) {
        const respostas = document.querySelectorAll('.answer');
        respostas.forEach(resposta => resposta.classList.remove('selecionada'));
        elemento.classList.add('selecionada');
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


    window.addEventListener('beforeunload', (event) => {
        if (respostaSelecionada !== null || perguntaIndex > 0) {
            event.preventDefault();
            event.returnValue = ''; 
        }
    });
});
