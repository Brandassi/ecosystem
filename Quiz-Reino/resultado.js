document.addEventListener("DOMContentLoaded", () => {
    // Recupera o número de acertos do localStorage
    const acertos = localStorage.getItem("acertos");
    const respostasCertasElement = document.getElementById("correct-answers");

    // Exibe os acertos na página, se disponíveis
    if (acertos !== null) {
        respostasCertasElement.textContent = acertos;
    } else {
        console.warn("Nenhuma pontuação encontrada no localStorage.");
    }

    // Botão para fechar a tela de resultados e redirecionar para a página inicial
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        window.location.href = "../index.html"; // Redireciona para a página inicial
    });

    // Função para salvar a pontuação no servidor
    async function saveScore(score, nomeUsuario) {
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
                    Authorization: `Bearer ${TOKEN}`, // Adiciona o token no cabeçalho
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: nomeUsuario, score: parseInt(score, 10) }) // Envia nome e pontuação
            });

            if (response.ok) {
                console.log("Pontuação salva com sucesso no servidor!");
                alert("Sua pontuação foi salva no servidor!");
            } else {
                const data = await response.json();
                console.error("Erro ao salvar pontuação:", data.message);
                alert("Erro ao salvar sua pontuação no servidor. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            alert("Erro de conexão com o servidor. Verifique sua internet.");
        }
    }

    // Função para mostrar o ranking e salvar a pontuação localmente
    const showRankingButton = document.getElementById("show-ranking");

    showRankingButton.addEventListener("click", () => {
        // Solicita ao usuário o nome para o ranking
        const nomeUsuario = prompt("Digite seu nome para o ranking:");
        if (!nomeUsuario) {
            alert("O nome não pode estar vazio!");
            return;
        }

        const ranking = JSON.parse(localStorage.getItem("ranking")) || []; // Recupera ranking local

        // Adiciona o jogador ao ranking local
        ranking.push({ name: nomeUsuario, score: parseInt(acertos, 10), avatar: "pessoa.png" });

        // Ordena o ranking por pontuação em ordem decrescente
        ranking.sort((a, b) => b.score - a.score);

        // Atualiza o ranking no localStorage
        localStorage.setItem("ranking", JSON.stringify(ranking));

        // Envia a pontuação para o servidor
        saveScore(acertos, nomeUsuario);

        // Redireciona para a página de ranking
        window.location.href = "../rankings/ranking.html";
    });
});
