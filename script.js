document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  // Verifica se o usuário está logado
  const usuarioLogado = localStorage.getItem("usuarioLogado");

  const loginButton = document.querySelector('.btn-login'); // Certifique-se de que o botão tenha essa classe

  if (usuarioLogado) {
    // Se o usuário estiver logado, substitui o botão de login pelo nome do usuário
    const usuario = JSON.parse(usuarioLogado); // Recupera o nome do usuário do localStorage
    loginButton.textContent = `Olá, ${usuario.nome}`; // Exibe o nome no botão
    loginButton.removeAttribute("href"); // Remove o link de login
    loginButton.style.backgroundColor = "#004d00"; // Muda a cor de fundo do botão
    loginButton.style.color = "#fff"; // Ajusta a cor do texto, se necessário

    // Opcional: adicionar funcionalidade de logout
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("token");
      window.location.href = "./cadastros/login.html"; // Redireciona para o login
    });
  } else {
    // Caso não tenha feito login, o botão de login permanece como antes
    loginButton.textContent = "Fazer Login";
    loginButton.href = "./cadastros/login.html"; // Garante que o link funcione
    loginButton.style.backgroundColor = "#007bff"; // Cor padrão do botão
    loginButton.style.color = "#fff"; // Ajusta a cor do texto
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("transparente");
    } else {
      header.classList.remove("transparente");
    }
  });

  document
    .querySelector('a[href="#sobre-nos"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("sobre-nos")
        .scrollIntoView({ behavior: "smooth" });
    });

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
