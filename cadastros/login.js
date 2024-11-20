document.getElementById("loginForm").addEventListener("submit", async (e) => {
    // Impede o comportamento padrão de recarregar a página ao enviar o formulário
    e.preventDefault();

    // Obtém os valores dos campos de entrada
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage"); // Elemento para exibir erros

    // Limpa mensagens de erro anteriores
    errorMessage.textContent = "";

    try {
        // Faz uma requisição POST para o endpoint de login na API
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Converte a resposta para JSON
            const data = await response.json();

            // Armazena o token e o nome do usuário no localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuarioLogado", JSON.stringify({ username }));

            // Redireciona para a página inicial
            window.location.href = "../index.html";
        } else {
            // Exibe a mensagem de erro retornada pela API ou uma mensagem padrão
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || "Usuário ou senha incorretos!";
        }
    } catch (error) {
        // Exibe mensagem de erro genérica no caso de falha no servidor
        console.error("Erro:", error);
        errorMessage.textContent = "Erro no servidor. Tente novamente mais tarde.";
    }
});
