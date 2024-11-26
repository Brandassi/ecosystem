document.addEventListener("DOMContentLoaded", () => {
    // Recupera o número de acertos do localStorage
    const acertos = localStorage.getItem("acertos");
    const respostasCertasElement = document.getElementById("correct-answers");

    // Verifica se acertos existem e exibe o valor na página
    if (acertos !== null) {
        respostasCertasElement.textContent = acertos;
    }

    // Botão para fechar a tela de resultados e redirecionar
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        window.location.href = "../index.html";  // Redireciona para a página inicial
    });

    // Função para salvar a pontuação no servidor
    async function saveScore(score, nomeUsuario) {
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
                body: JSON.stringify({ username: nomeUsuario, score: score }) // Envia o nome do jogador e a pontuação
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

    // Função para mostrar o ranking e salvar a pontuação no ranking local
    const showRankingButton = document.getElementById("show-ranking");

    showRankingButton.addEventListener("click", () => {
        // Solicita ao usuário o nome para o ranking
        const nomeUsuario = prompt("Digite seu nome para o ranking:");
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

        // Adiciona o jogador ao ranking local
        ranking.push({ name: nomeUsuario, score: parseInt(acertos, 10), avatar: "pessoa.png" });

        // Ordena o ranking por pontuação em ordem decrescente
        ranking.sort((a, b) => b.score - a.score);

        // Armazena o ranking no localStorage
        localStorage.setItem("ranking", JSON.stringify(ranking));

        // Envia a pontuação para o servidor
        saveScore(acertos, nomeUsuario);

        // Redireciona para a página de ranking
        window.location.href = "../rankings/ranking.html";
    });
});
