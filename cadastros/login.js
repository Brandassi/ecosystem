document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/api/verify-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          // Redireciona para a página inicial se o token for válido
          alert("Você já está logado!");
          window.location.href = "../index.html";
          return;
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error.message);
      }
    }
  });
  
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");
  
    errorMessage.textContent = "";
  
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuarioLogado", JSON.stringify({ username }));
          window.location.href = "../index.html";
        } else {
          errorMessage.textContent = "Erro ao receber o token de autenticação.";
        }
      } else {
        const errorData = await response.json();
        errorMessage.textContent = errorData.message || "Usuário ou senha incorretos!";
      }
    } catch (error) {
      console.error("Erro:", error);
      errorMessage.textContent = "Erro no servidor. Tente novamente mais tarde.";
    }
  });
  