fetch('perguntas.json')
    .then(response => response.json())
    .then(quizDados => {
        let indicePerguntaAtual = 0;
        let acertos = 0;

        function carregarPergunta() {
            const tituloPergunta = document.getElementById("titulo-pergunta");
            const listaRespostas = document.getElementById("lista-respostas");

           
            listaRespostas.innerHTML = '';

           
            tituloPergunta.innerText = quizDados[indicePerguntaAtual].pergunta;

           
            quizDados[indicePerguntaAtual].opcoes.forEach((opcao, index) => {
                const li = document.createElement("li");
                li.className = "resposta";
                li.innerText = opcao;
                li.addEventListener('click', () => {
                    
                    if (index === quizDados[indicePerguntaAtual].correta) {
                        acertos++;
                    }
                    
                    avancarQuiz();
                });
                listaRespostas.appendChild(li);
            });

           
            const progresso = document.querySelector(".progresso");
            const porcentagemProgresso = ((indicePerguntaAtual + 1) / quizDados.length) * 100;
            progresso.style.width = `${porcentagemProgresso}%`;
        }

        function avancarQuiz() {
            indicePerguntaAtual++;
            if (indicePerguntaAtual < quizDados.length) {
                carregarPergunta();
            } else {
               
                localStorage.setItem('quizAcertos', acertos);
                window.location.href = 'resultado.html';
            }
        }

        document.getElementById("botao-proximo").addEventListener("click", () => {
            avancarQuiz();
        });


        carregarPergunta();
    })
    .catch(error => console.error('Erro ao carregar perguntas:', error));
