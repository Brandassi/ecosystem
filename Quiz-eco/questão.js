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

  // Função para carregar as perguntas
  function carregarPergunta() {
    if (perguntaIndex >= perguntas.length) {
      // Salva os acertos no localStorage
      const usuario = localStorage.getItem("usuarioLogado") || "Anônimo";
      const acertosAntigos = JSON.parse(localStorage.getItem("ranking")) || [];
      acertosAntigos.push({ usuario, acertos });

      // Ordena o ranking em ordem decrescente de acertos
      acertosAntigos.sort((a, b) => b.acertos - a.acertos);

      // Armazena o novo ranking
      localStorage.setItem("ranking", JSON.stringify(acertosAntigos));

      // Redireciona para a tela de resultados
      localStorage.setItem("acertos", acertos);
      window.onbeforeunload = null;
      window.location.href = "resultado.html"; // Encaminha para a tela de resultados
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

  // Selecionar resposta
  function selecionarResposta(elemento, estaCorreta) {
    const respostas = document.querySelectorAll(".resposta");
    respostas.forEach((resposta) => resposta.classList.remove("selecionada"));
    elemento.classList.add("selecionada");
    respostaSelecionada = { elemento, estaCorreta };
  }

  // Avançar para a próxima pergunta
  function avancar() {
    if (respostaSelecionada === null) {
      alert("Por favor, selecione uma resposta.");
      return;
    }

    const { elemento, estaCorreta } = respostaSelecionada;

    if (estaCorreta) {
      acertos++;
      elemento.classList.add("correta");
    } else {
      elemento.classList.add("errada");
      const respostas = document.querySelectorAll(".resposta");
      respostas[perguntas[perguntaIndex].correctOption].classList.add("correta");
    }

    respostaSelecionada = null;

    setTimeout(() => {
      perguntaIndex++;
      carregarPergunta();
    }, 1000);
  }

  // Sair do quiz
  function confirmarSaida() {
    const confirmacao = confirm("Você realmente deseja sair do quiz?");
    if (confirmacao) {
      window.location.href = "../index.html";
    }
  }

  // Carregar perguntas de um arquivo JSON
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
