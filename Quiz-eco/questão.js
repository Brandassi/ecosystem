document.addEventListener("DOMContentLoaded", () => {
  const perguntaTitulo = document.getElementById("titulo-pergunta");
  const listaRespostas = document.getElementById("lista-respostas");
  const botaoProximo = document.getElementById("botao-proximo");
  const progresso = document.querySelector(".progresso");
  let respostaSelecionada = null;
  let perguntaIndex = 0;
  let acertos = 0;

  function carregarPergunta() {
    fetch("perguntas.json")
      .then((response) => response.json())
      .then((data) => {
        const pergunta = data[perguntaIndex];
        perguntaTitulo.textContent = pergunta.pergunta;
        listaRespostas.innerHTML = "";

        pergunta.opcoes.forEach((opcao, index) => {
          const li = document.createElement("li");
          li.className = "resposta";
          li.textContent = opcao;
          li.addEventListener("click", () =>
            selecionarResposta(li, index === pergunta.correta)
          );
          listaRespostas.appendChild(li);
        });

        progresso.style.width = `${((perguntaIndex + 1) / data.length) * 100}%`;
      })
      .catch((error) => console.error("Erro ao carregar perguntas:", error));
  }

  function selecionarResposta(elemento, estaCorreta) {
    const respostas = document.querySelectorAll(".resposta");
    respostas.forEach((resposta) => resposta.classList.remove("selecionada"));
    elemento.classList.add("selecionada");
    respostaSelecionada = estaCorreta;
  }

  function avancar() {
    if (respostaSelecionada === null) {
      alert("Por favor, selecione uma resposta.");
      return;
    }

    if (respostaSelecionada) {
      acertos++;
    }

    respostaSelecionada = null;
    perguntaIndex++;

    if (perguntaIndex >= data.length) {
      localStorage.setItem("acertos", acertos);
      window.location.href = "resultado.html";
    } else {
      carregarPergunta();
    }
  }

  botaoProximo.addEventListener("click", avancar);
  carregarPergunta();
});
