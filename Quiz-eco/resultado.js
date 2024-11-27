document.addEventListener("DOMContentLoaded", () => {
    const acertos = localStorage.getItem("acertos");
    const respostasCertasElement = document.getElementById("correct-answers");

    // Exibe os acertos na página
    if (acertos !== null) {
        respostasCertasElement.textContent = acertos;
    }

    // Botão para fechar e voltar ao início
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    // Função para salvar a pontuação no servidor
    async function saveScore(score) {
        const TOKEN = localStorage.getItem("token"); // Recupera o token do localStorage

        if (!TOKEN) {
            console.error("Token de autenticação não encontrado!");
            alert("Erro: você precisa estar logado para salvar sua pontuação.");
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
                alert("Pontuação enviada ao servidor com sucesso!");
            } else {
                const data = await response.json();
                console.error("Erro ao salvar pontuação:", data.message);
                alert("Erro ao salvar pontuação no servidor.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro de conexão com o servidor.");
        }
    }

    // Botão "Ver Ranking"
    const showRankingButton = document.getElementById("show-ranking");

    showRankingButton.addEventListener("click", () => {
        // Pega o nome do usuário para salvar no ranking local
        const nomeUsuario = prompt("Digite seu nome para o ranking:");
        if (!nomeUsuario) {
            alert("Nome não pode ser vazio!");
            return;
        }

        // Recupera o ranking local
        const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

        // Adiciona a nova pontuação
        ranking.push({ name: nomeUsuario, score: parseInt(acertos, 10), avatar: "pessoa.png" });

        // Ordena o ranking por pontuação
        ranking.sort((a, b) => b.score - a.score);

        // Salva o ranking localmente
        localStorage.setItem("ranking", JSON.stringify(ranking));

        // Salva a pontuação no servidor
        saveScore(parseInt(acertos, 10));

        // Redireciona para a página de ranking
        window.location.href = "../rankings/ranking.html";
    });
});
