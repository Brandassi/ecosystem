const API_URL = "https://ecosystem-iota.vercel.app/ranking.html"; // Defina a URL correta para a rota do ranking

// Função para buscar o ranking do servidor
async function fetchRanking() {
    // Recupera o token armazenado no localStorage
    const TOKEN = localStorage.getItem('token'); // Substitua pelo método de armazenamento do token

    // Verifica se o token existe
    if (!TOKEN) {
        console.error("Token de autenticação não encontrado!");
        return [];
    }

    try {
        // Realiza a requisição para buscar o ranking
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`, // Usa o token recuperado
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erro ao buscar ranking");

        const data = await response.json();

        // Verifica se a API retornou dados válidos
        if (!Array.isArray(data)) {
            console.error("Dados inválidos recebidos da API:", data);
            return [];
        }

        // Mapeia os dados para incluir posição, avatar e medalhas
        return data.map((player, index) => ({
            position: index + 1,  // Posição do ranking, começando de 1
            name: player.username, // Nome do jogador
            score: player.score,   // Pontuação do jogador
            avatar: "pessoa.png",  // Usa o avatar fixo 'pessoa.png' para todos
            medal: index < 3 ? `medalha${index + 1}.png` : null // Medalha para os 3 primeiros
        }));

    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        return [];
    }
}

// Função para renderizar o ranking
function renderRanking(data) {
    const rankingList = document.querySelector(".ranking-list");
    rankingList.innerHTML = ""; // Limpa a lista existente

    // Verifica se existem jogadores no ranking
    if (data.length === 0) {
        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "Não há dados de ranking disponíveis.";
        rankingList.appendChild(noDataMessage);
        return;
    }

    // Renderiza os jogadores no ranking
    data.forEach((player) => {
        const rankItem = document.createElement("div");
        rankItem.classList.add("rank-item");

        // Adiciona a medalha ou o número da posição
        if (player.medal) {
            const medalImg = document.createElement("img");
            medalImg.src = player.medal;
            medalImg.alt = `Medalha da posição ${player.position}`;
            medalImg.classList.add("medal");
            rankItem.appendChild(medalImg);
        } else {
            const rankNumber = document.createElement("span");
            rankNumber.classList.add("rank-number");
            rankNumber.textContent = player.position;
            rankItem.appendChild(rankNumber);
        }

        // Adiciona o avatar do jogador (fixo para todos)
        const avatarImg = document.createElement("img");
        avatarImg.src = player.avatar || "default-avatar.png";
        avatarImg.alt = `Avatar de ${player.name}`;
        avatarImg.classList.add("avatar");
        rankItem.appendChild(avatarImg);

        // Adiciona o nome do jogador
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name");
        nameSpan.textContent = player.name;
        rankItem.appendChild(nameSpan);

        // Adiciona a pontuação do jogador
        const scoreSpan = document.createElement("span");
        scoreSpan.classList.add("score");
        scoreSpan.textContent = player.score;
        rankItem.appendChild(scoreSpan);

        // Adiciona o item do ranking na lista
        rankingList.appendChild(rankItem);
    });
}

// Inicializa o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    const ranking = await fetchRanking();
    renderRanking(ranking);
});
