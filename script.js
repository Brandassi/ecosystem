document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const loginButton = document.querySelector(".btn-login");

  // Verifica se o usuário está logado
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (usuarioLogado) {
    // Se o usuário estiver logado, exibe o nome no botão
    const usuario = JSON.parse(usuarioLogado); // Recupera o nome do usuário do localStorage
    loginButton.textContent = `Olá, ${usuario.username || "Usuário"}`;
    loginButton.removeAttribute("href"); // Remove o link de login
    loginButton.style.backgroundColor = "#004d00";
    loginButton.style.color = "#fff";

    // Adiciona funcionalidade de logout
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("token");
      alert("Você foi deslogado.");
      window.location.href = "./cadastros/login.html"; // Redireciona para o login
    });
  } else {
    // Caso o usuário não esteja logado
    loginButton.textContent = "Fazer Login";
    loginButton.href = "./cadastros/login.html"; // Garante o redirecionamento
  }

  // Torna o header transparente ao rolar a página
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("transparente");
    } else {
      header.classList.remove("transparente");
    }
  });

  // Rola suavemente para "Sobre Nós"
  document
    .querySelector('a[href="#sobre-nos"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("sobre-nos")
        .scrollIntoView({ behavior: "smooth" });
    });

  // Animação de hover nos cartões de quiz
  const quizCards = document.querySelectorAll(".quiz-card");
  quizCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
      card.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });
  });
});
