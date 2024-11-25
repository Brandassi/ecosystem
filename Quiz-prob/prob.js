document.addEventListener("DOMContentLoaded", () => {
    // Verifica se o token de autenticação existe no localStorage
    const token = localStorage.getItem("token");

    // Obtém os elementos do botão Jogar e da mensagem de login
    const playButton = document.querySelector(".play-button");
    const loginMessage = document.createElement("p");
    loginMessage.classList.add("hidden");
    loginMessage.style.color = "red";
    loginMessage.style.marginTop = "10px";
    loginMessage.textContent = "Faça login para acessar o quiz e o ranking!";
    document.querySelector(".quiz-content").appendChild(loginMessage);

    if (!token) {
        // Se o token não estiver presente, mostra a mensagem de login
        loginMessage.classList.remove("hidden");

        // Adiciona o redirecionamento ao botão Jogar para login
        playButton.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Você precisa fazer login para acessar o quiz e o ranking!");
            window.location.href = "../cadastros/login.html"; // Redireciona para a página de login
        });
    } else {
        // Se o token estiver presente, oculta a mensagem de login
        loginMessage.classList.add("hidden");

        // Redireciona diretamente para a página das questões quando o usuário clicar no botão Jogar
        playButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "questão.html"; // Redireciona para a página de questões
        });
    }
});
