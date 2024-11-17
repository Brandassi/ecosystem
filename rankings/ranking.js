// Função para renderizar o ranking
function renderRanking(data) {
    const rankingList = document.querySelector(".ranking-list");
    rankingList.innerHTML = ""; // Limpa a lista existente

    data.forEach((player, index) => {
        const rankItem = document.createElement("div");
        rankItem.classList.add("rank-item");

        // Adiciona a medalha ou o número da posição
        if (index === 0) {
            const medalImg = document.createElement("img");
            medalImg.src = player.medal || "medalha1.png";
            medalImg.alt = `Medalha de Ouro`;
            medalImg.classList.add("medal");
            rankItem.appendChild(medalImg);
        } else if (index === 1) {
            const medalImg = document.createElement("img");
            medalImg.src = player.medal || "medalha2.png";
            medalImg.alt = `Medalha de Prata`;
            medalImg.classList.add("medal");
            rankItem.appendChild(medalImg);
        } else if (index === 2) {
            const medalImg = document.createElement("img");
            medalImg.src = player.medal || "medalha3.png";
            medalImg.alt = `Medalha de Bronze`;
            medalImg.classList.add("medal");
            rankItem.appendChild(medalImg);
        } else {
            const rankNumber = document.createElement("span");
            rankNumber.classList.add("rank-number");
            rankNumber.textContent = index + 1;
            rankItem.appendChild(rankNumber);
        }

        const avatarImg = document.createElement("img");
        avatarImg.src = player.avatar;
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

// Função para atualizar o ranking com novos dados
function updateRanking(newData) {
    newData.sort((a, b) => b.score - a.score);
    renderRanking(newData);
}

// Inicializa o ranking com os dados do localStorage
document.addEventListener("DOMContentLoaded", () => {
    const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    renderRanking(ranking);
});
