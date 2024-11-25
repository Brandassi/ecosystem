const API_URL = "http://localhost:3000/api/ranking"; // URL da API de ranking

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
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`, // Usa o token recuperado
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Erro ao buscar ranking");
        const data = await response.json();

        // Mapeia os dados para incluir posição, avatar e medalhas
        return data.map((player, index) => ({
            position: player.position, // Posição do ranking vinda da API
            name: player.username,    // Nome do jogador
            score: player.score,      // Pontuação do jogador
            avatar: `avatar${index + 1}.png`, // Personalização do avatar
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

        const avatarImg = document.createElement("img");
        avatarImg.src = player.avatar || "default-avatar.png";
        avatarImg.alt = `Avatar de ${player.name}`;
        avatarImg.classList.add("avatar");
        rankItem.appendChild(avatarImg);

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name");
        nameSpan.textContent = player.name;
        rankItem.appendChild(nameSpan);

        const scoreSpan = document.createElement("span");
        scoreSpan.classList.add("score");
        scoreSpan.textContent = player.score;
        rankItem.appendChild(scoreSpan);

        rankingList.appendChild(rankItem);
    });
}

// Inicializa o ranking ao carregar a página
document.addEventListener("DOMContentLoaded", async () => {
    const ranking = await fetchRanking();
    renderRanking(ranking);
});
