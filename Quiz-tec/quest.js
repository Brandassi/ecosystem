document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.querySelector('.content h2');
    const opcoesContainer = document.querySelector('.options');
    const botaoProximo = document.querySelector('.next-button');
    const progressoPreencher = document.querySelector('.progress-fill');
    const botaoFechar = document.querySelector('.close-button');
    let respostaSelecionada = null;
    let perguntaIndex = 0;
    let acertos = 0;
    let perguntas = [];
    let respostaClicada = null;

    function carregarPergunta() {
        fetch('perguntas.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta da rede');
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Dados inválidos ou vazios');
                }

                perguntas = data;
                exibirPergunta();
            })
            .catch(error => console.error('Erro ao carregar perguntas:', error));
    }

    function exibirPergunta() {
        const perguntaAtual = perguntas[perguntaIndex];
        perguntaTitulo.textContent = perguntaAtual.question;
        opcoesContainer.innerHTML = '';

        perguntaAtual.options.forEach((opcao, index) => {
            const botao = document.createElement('button');
            botao.classList.add('option-button');
            botao.textContent = opcao;
            botao.onclick = () => selecionarResposta(botao, index, perguntaAtual.correctOption);
            opcoesContainer.appendChild(botao);
        });

        const larguraProgresso = ((perguntaIndex + 1) / perguntas.length) * 100;
        progressoPreencher.style.width = `${larguraProgresso}%`;
    }

    function selecionarResposta(botaoSelecionado, index, correctOption) {
        const botoesOpcoes = document.querySelectorAll('.option-button');
        botoesOpcoes.forEach(botao => botao.classList.remove('selecionada'));
        botaoSelecionado.classList.add('selecionada');
        respostaSelecionada = index;
        respostaClicada = botaoSelecionado;
    }

    function destacarRespostas(correctOption) {
        const botoesOpcoes = document.querySelectorAll('.option-button');
        botoesOpcoes.forEach((botao, index) => {
            if (index === correctOption) {
                botao.style.backgroundColor = 'green'; // Resposta correta
            } else if (index === respostaSelecionada && respostaSelecionada !== correctOption) {
                botao.style.backgroundColor = 'red'; // Resposta errada
            }
            botao.disabled = true; // Desabilita os botões após a seleção
        });
    }

    function avancar() {
        if (respostaSelecionada === null) {
            alert('Por favor, selecione uma resposta.');
            return;
        }

        const perguntaAtual = perguntas[perguntaIndex];
        destacarRespostas(perguntaAtual.correctOption);

        if (respostaSelecionada === perguntaAtual.correctOption) {
            acertos++;
        }

        setTimeout(() => {
            respostaSelecionada = null;
            perguntaIndex++;

            if (perguntaIndex >= perguntas.length) {
                localStorage.setItem('acertos', acertos);
                window.location.href = 'resultado.html';
            } else {
                exibirPergunta();
            }
        }, 1000); // Espera 1 segundo antes de avançar
    }

    function confirmarSaida() {
        const confirmacao = confirm('Você realmente deseja sair do quiz?');
        if (confirmacao) {
            window.location.href = '../index.html'; 
        }
    }

    botaoProximo.addEventListener('click', avancar);
    botaoFechar.addEventListener('click', confirmarSaida);

    carregarPergunta();
});
