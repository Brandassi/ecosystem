document.addEventListener("DOMContentLoaded", () => {
    const respostasCertas = document.getElementById("correct-answers");
    const acertos = localStorage.getItem("acertos") || 0;
    respostasCertas.textContent = acertos;

    // Remove os dados de acertos do localStorage para evitar duplicação
    localStorage.removeItem("acertos");

    // Função para salvar a pontuação no servidor
    async function saveScore(score) {
        const TOKEN = localStorage.getItem("token"); // Recupera o token do localStorage

        if (!TOKEN) {
            console.error("Token de autenticação não encontrado!");
            alert("Você precisa estar logado para salvar sua pontuação.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/save-score", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ score: parseInt(score, 10) }), // Envia a pontuação como número
            });

            if (response.ok) {
                console.log("Pontuação salva com sucesso no servidor!");
                alert("Sua pontuação foi salva no servidor com sucesso!");
            } else {
                const data = await response.json();
                console.error("Erro ao salvar pontuação:", data.message);
                alert("Erro ao salvar sua pontuação no servidor. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro de conexão com o servidor:", error);
            alert("Erro ao conectar com o servidor. Verifique sua internet.");
        }
    }

    // Adiciona evento para salvar a pontuação quando o usuário fecha a tela
    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => {
        // Salva a pontuação no servidor antes de redirecionar
        saveScore(acertos);

        // Redireciona para a página inicial
        window.location.href = "../index.html";
    });
});
