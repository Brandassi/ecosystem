document.addEventListener('DOMContentLoaded', () => {
    const respostasCertasElement = document.getElementById('respostas-certas');
    const acertos = localStorage.getItem('acertos') || 0;
    respostasCertasElement.textContent = acertos;

    // Captura o nome do jogador do localStorage ou define como "Anônimo"
    const nomeJogador = localStorage.getItem('nomeJogador') || "Anônimo";

    // Armazena os dados no localStorage para uso futuro, se necessário
    localStorage.setItem('nomeJogador', nomeJogador);
    localStorage.setItem('acertos', acertos);

    // Salva o resultado no servidor
    enviarResultadoParaRanking(acertos);

    // Limpa dados temporários após salvar
    localStorage.removeItem('acertos');
    localStorage.removeItem('nomeJogador');
});

// Função para enviar os resultados do quiz para a API
async function enviarResultadoParaRanking(pontos) {
    const API_URL = "http://localhost:3000/api/save-score"; // URL da API para salvar pontuação
    const TOKEN = localStorage.getItem('token'); // Token JWT do jogador

    if (!TOKEN) {
        console.error("Token de autenticação não encontrado!");
        alert("Você precisa estar logado para salvar sua pontuação.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}` // Token enviado no cabeçalho
            },
            body: JSON.stringify({ score: parseInt(pontos, 10) }) // Envia a pontuação como número
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao enviar resultado:", errorData.message);
            alert("Erro ao salvar sua pontuação no servidor. Tente novamente.");
            return;
        }

        console.log("Resultado salvo com sucesso!");
        alert("Sua pontuação foi salva no servidor!");
    } catch (error) {
        console.error("Erro ao enviar resultado:", error);
        alert("Erro de conexão com o servidor. Tente novamente mais tarde.");
    }
}
