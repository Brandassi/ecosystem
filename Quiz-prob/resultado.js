document.addEventListener('DOMContentLoaded', () => {
    const respostasCertas = document.getElementById('respostas-certas');
    const acertos = localStorage.getItem('acertos') || 0;
    respostasCertas.textContent = acertos;

    // Nome do jogador (substituir pelo método real de captura, como um campo de input)
    const nomeJogador = localStorage.getItem('nomeJogador') || "Anônimo";

    // Armazenar os dados para passar para o ranking
    localStorage.setItem('nomeJogador', nomeJogador);
    localStorage.setItem('acertos', acertos);

    // Salvar resultado no servidor
    enviarResultadoParaRanking(nomeJogador, acertos);

    // Limpar dados do localStorage após salvar
    localStorage.removeItem('acertos');
    localStorage.removeItem('nomeJogador');
});

// Função para enviar os resultados do quiz para a API
async function enviarResultadoParaRanking(nome, pontos) {
    const API_URL = "http://localhost:3000/api/ranking"; // URL da API de ranking
    const TOKEN = localStorage.getItem('token'); // Token JWT do jogador (se necessário)

    if (!TOKEN) {
        console.error("Token de autenticação não encontrado!");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            body: JSON.stringify({ username: nome, score: pontos })
        });

        if (!response.ok) throw new Error("Erro ao enviar resultado para o ranking");
        console.log("Resultado salvo com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar resultado:", error);
    }
}
