document.addEventListener("DOMContentLoaded", () => {
  const perguntaTitulo = document.getElementById("titulo-pergunta");
  const listaRespostas = document.getElementById("lista-respostas");
  const botaoProximo = document.getElementById("botao-proximo");
  const botaoFechar = document.querySelector(".botao-fechar");
  const progresso = document.querySelector(".progresso");

  let respostaSelecionada = null;
  let perguntaIndex = 0;
  let acertos = 0;
  let perguntas = [];

  function carregarPergunta() {
    if (perguntaIndex >= perguntas.length) {
      localStorage.setItem("acertos", acertos);

      
      window.onbeforeunload = null;

      window.location.href = "resultado.html";
      return;
    }

    const pergunta = perguntas[perguntaIndex];
    perguntaTitulo.textContent = pergunta.question;
    listaRespostas.innerHTML = "";

    pergunta.options.forEach((opcao, index) => {
      const li = document.createElement("li");
      li.className = "resposta";
      li.textContent = opcao;
      li.addEventListener("click", () => selecionarResposta(li, index === pergunta.correctOption));
      listaRespostas.appendChild(li);
    });

    progresso.style.width = `${((perguntaIndex + 1) / perguntas.length) * 100}%`;
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
    carregarPergunta();
  }

  function confirmarSaida() {
    const confirmacao = confirm("Você realmente deseja sair do quiz?");
    if (confirmacao) {
      window.location.href = "../index.html"; 
    }
  }

  fetch("perguntas.json")
    .then((response) => response.json())
    .then((data) => {
      perguntas = data;
      carregarPergunta();
    })
    .catch((error) => console.error("Erro ao carregar perguntas:", error));

  botaoProximo.addEventListener("click", avancar);
  botaoFechar.addEventListener("click", confirmarSaida);

  window.onbeforeunload = function () {
    return "Tem certeza que deseja sair do quiz?";
  };
});
