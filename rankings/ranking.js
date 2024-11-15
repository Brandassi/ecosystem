// Dados iniciais do ranking
const rankingData = [
    { name: "Nome 1", score: 1000, avatar: "pessoa.png", medal: "medalha1.png" },
    { name: "Nome 2", score: 900, avatar: "pessoa.png", medal: "medalha2.png" },
    { name: "Nome 3", score: 800, avatar: "pessoa.png", medal: "medalha3.png" },
    { name: "Nome 4", score: 700, avatar: "pessoa.png" },
    { name: "Nome 5", score: 600, avatar: "pessoa.png" }
];

// Função para renderizar o ranking
function renderRanking(data) {
    const rankingList = document.querySelector(".ranking-list");
    rankingList.innerHTML = ""; // Limpa a lista existente

    data.forEach((player, index) => {
        // Cria o item do ranking
        const rankItem = document.createElement("div");
        rankItem.classList.add("rank-item");

        // Adiciona a medalha ou o número da posição
        if (player.medal) {
            const medalImg = document.createElement("img");
            medalImg.src = player.medal;
            medalImg.alt = `Medalha de ${index + 1}`;
            medalImg.classList.add("medal");
            rankItem.appendChild(medalImg);
        } else {
            const rankNumber = document.createElement("span");
            rankNumber.classList.add("rank-number");
            rankNumber.textContent = index + 1;
            rankItem.appendChild(rankNumber);
        }

        // Adiciona o avatar
        const avatarImg = document.createElement("img");
        avatarImg.src = player.avatar;
        avatarImg.alt = `Avatar de ${player.name}`;
        avatarImg.classList.add("avatar");
        rankItem.appendChild(avatarImg);

        // Adiciona o nome
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name");
        nameSpan.textContent = player.name;
        rankItem.appendChild(nameSpan);

        // Adiciona a pontuação
        const scoreSpan = document.createElement("span");
        scoreSpan.classList.add("score");
        scoreSpan.textContent = player.score;
        rankItem.appendChild(scoreSpan);

        // Adiciona o item à lista
        rankingList.appendChild(rankItem);
    });
}

// Função para atualizar o ranking com novos dados
function updateRanking(newData) {
    // Ordena por pontuação em ordem decrescente
    newData.sort((a, b) => b.score - a.score);
    renderRanking(newData);
}

// Inicializa o ranking com os dados iniciais
document.addEventListener("DOMContentLoaded", () => {
    renderRanking(rankingData);
});
