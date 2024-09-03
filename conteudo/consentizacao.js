document.addEventListener("DOMContentLoaded", (event) => {
  const botaoFechar = document.querySelector(".fechar");
  if (botaoFechar) {
    botaoFechar.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }

  const setasNavegacao = document.querySelectorAll(".seta");
  setasNavegacao.forEach((seta) => {
    seta.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = event.target.href;
    });
  });

  const botaoJogar = document.querySelector(".botao-jogar");
  if (botaoJogar) {
    botaoJogar.addEventListener("click", () => {
      window.location.href = "../Quiz-prob/prob.html";
    });
  }
});
