document.addEventListener("DOMContentLoaded", () => {
    // Verifica se o usuário está logado através do localStorage
    const isLoggedIn = localStorage.getItem("usuarioLogado") !== null;
  
    // Obtém os elementos do botão Jogar e da mensagem de login
    const playButton = document.getElementById("playButton");
    const loginMessage = document.getElementById("loginMessage");
  
    if (!isLoggedIn) {
      // Se o usuário não estiver logado, mostra a mensagem de login
      loginMessage.classList.remove("hidden");
  
      // Adiciona o redirecionamento ao botão Jogar para login
      playButton.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Você precisa fazer login para acessar o quiz e o ranking!");
        window.location.href = "../cadastros/login.html"; // Redireciona para a página de login
      });
    } else {
      // Se o usuário estiver logado, oculta a mensagem de login
      loginMessage.classList.add("hidden");
  
      // Redireciona diretamente para a página das questões quando o usuário clicar no botão Jogar
      playButton.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "questão.html"; // Redireciona para a página de questões
      });
    }
});
