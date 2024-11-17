document.addEventListener("DOMContentLoaded", () => {
  const acertos = localStorage.getItem("acertos");
  const respostasCertasElement = document.getElementById("correct-answers");

  if (acertos !== null) {
    respostasCertasElement.textContent = acertos;
  }

  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  // Adiciona o evento para o botão "Ver Ranking"
  const showRankingButton = document.getElementById("show-ranking");

  showRankingButton.addEventListener("click", () => {
    // Salva o resultado no ranking
    const nomeUsuario = prompt("Digite seu nome para o ranking:");
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    ranking.push({ name: nomeUsuario, score: acertos, avatar: "pessoa.png" });

    // Ordena o ranking por pontuação
    ranking.sort((a, b) => b.score - a.score);

    // Armazena novamente o ranking no localStorage
    localStorage.setItem("ranking", JSON.stringify(ranking));

    // Redireciona para a página de ranking
    window.location.href = "ranking.html";
  });
});
