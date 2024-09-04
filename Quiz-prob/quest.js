document.addEventListener('DOMContentLoaded', () => {
    const perguntaTitulo = document.getElementById('titulo-pergunta');
    const listaRespostas = document.getElementById('lista-respostas');
    const botaoProximo = document.getElementById('botao-proximo');
    const progresso = document.querySelector('.progresso');
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

                pergunta.respostas.forEach(resposta => {
                    const li = document.createElement('li');
                    li.className = 'resposta';
                    li.textContent = resposta;
                    li.addEventListener('click', () => selecionarResposta(li, pergunta.resposta_certa));
                    listaRespostas.appendChild(li);
                });

                progresso.style.width = `${(perguntaIndex + 1) / data.perguntas.length * 100}%`;
            })
            .catch(error => console.error('Erro ao carregar perguntas:', error));
    }

    function selecionarResposta(elemento, respostaCerta) {
        const respostas = document.querySelectorAll('.resposta');
        respostas.forEach(resposta => resposta.classList.remove('selecionada'));
        elemento.classList.add('selecionada');
        respostaSelecionada = elemento.textContent;
    }

    function avancar() {
        if (!respostaSelecionada) {
            alert('Por favor, selecione uma resposta.');
            return;
        }

        const perguntaCerta = document.querySelector('.resposta.selecionada').textContent;
        if (respostaSelecionada === perguntaCerta) {
            acertos++;
        }

        respostaSelecionada = null;
        perguntaIndex++;

        if (perguntaIndex >= 1) {
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
