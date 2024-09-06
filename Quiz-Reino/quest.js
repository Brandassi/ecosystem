document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.getElementById('question-title');
    const listaRespostas = document.getElementById('answers-list');
    const botaoProximo = document.getElementById('next-button');
    const botaoFechar = document.querySelector('.close-button');
    const progresso = document.querySelector('.progress');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;
    let perguntas = [];
    let indoParaResultados = false;

    function carregarPergunta() {
        if (perguntaIndex >= perguntas.length) {
            localStorage.setItem('acertos', acertos);
            indoParaResultados = true;
            window.location.href = 'resultado.html';
            return;
        }

        const pergunta = perguntas[perguntaIndex];
        perguntaTitulo.textContent = pergunta.questao;
        listaRespostas.innerHTML = '';

        pergunta.respostas.forEach((opcao, index) => {
            const li = document.createElement('li');
            li.className = 'answer';
            li.textContent = opcao;
            li.addEventListener('click', () => selecionarResposta(li, index === pergunta.resposta_certa));
            listaRespostas.appendChild(li);
        });

        progresso.style.width = `${((perguntaIndex + 1) / perguntas.length) * 100}%`;
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
        carregarPergunta();
    }

    function confirmarSaida() {
        if (!indoParaResultados) {
            const confirmacao = confirm("Você realmente deseja sair do quiz?");
            if (confirmacao) {
                window.location.href = "../index.html";
            }
        }
    }

    // Adicione logs para depuração
    console.log('Iniciando carregamento de perguntas...');

    fetch('perguntas.json')
        .then(response => {
            console.log('Resposta recebida:', response);
            if (!response.ok) {
                throw new Error('Rede não está respondendo corretamente');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados JSON recebidos:', data);
            perguntas = data.perguntas;
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
