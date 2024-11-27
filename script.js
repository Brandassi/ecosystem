document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "./cadastros/login.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/verify-token", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token inválido ou expirado.");
    }
  } catch (error) {
    console.error("Erro na validação do token:", error.message);
    alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogado");
    window.location.href = "./cadastros/login.html";
    return;
  }

  const header = document.querySelector("header");
  const loginButton = document.querySelector(".btn-login");
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  loginButton.textContent = `Olá, ${usuarioLogado.username || "Usuário"}`;
  loginButton.removeAttribute("href");
  loginButton.style.backgroundColor = "#004d00";
  loginButton.style.color = "#fff";

  loginButton.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("token");
    alert("Você foi deslogado.");
    window.location.href = "./cadastros/login.html";
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("transparente");
    } else {
      header.classList.remove("transparente");
    }
  });
});
