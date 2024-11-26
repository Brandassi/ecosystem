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

  // Função para salvar a pontuação no servidor
  async function saveScore(score) {
      const TOKEN = localStorage.getItem("token"); // Recupera o token do localStorage

      if (!TOKEN) {
          console.error("Token de autenticação não encontrado!");
          return;
      }

      try {
          const response = await fetch("http://localhost:3000/api/save-score", {
              method: "POST",
              headers: {
                  Authorization: `Bearer ${TOKEN}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ score }) // Envia a pontuação
          });

          if (response.ok) {
              console.log("Pontuação salva com sucesso!");
          } else {
              const data = await response.json();
              console.error("Erro ao salvar pontuação:", data.message);
          }
      } catch (error) {
          console.error("Erro de conexão:", error);
      }
  }

  // Adiciona o evento para o botão "Ver Ranking"
  const showRankingButton = document.getElementById("show-ranking");

  showRankingButton.addEventListener("click", () => {
      // Salva o resultado no ranking local
      const nomeUsuario = prompt("Digite seu nome para o ranking:");
      const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

      ranking.push({ name: nomeUsuario, score: acertos, avatar: "pessoa.png" });

      // Ordena o ranking por pontuação
      ranking.sort((a, b) => b.score - a.score);

      // Armazena novamente o ranking no localStorage
      localStorage.setItem("ranking", JSON.stringify(ranking));

      // Salva a pontuação no servidor
      saveScore(acertos);

      // Redireciona para a página de ranking
      window.location.href = "../rankings/ranking.html";
  });
});
