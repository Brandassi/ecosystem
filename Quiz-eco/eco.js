document.addEventListener("DOMContentLoaded", () => {
  // Obtém o botão "Jogar"
  const playButton = document.getElementById("playButton");

  // Redireciona diretamente para a página das questões quando o botão "Jogar" é clicado
  playButton.addEventListener("click", (e) => {
    e.preventDefault();  // Previne o comportamento padrão de navegação
    window.location.href = "questão.html"; // Redireciona para a página de questões
  });
});
