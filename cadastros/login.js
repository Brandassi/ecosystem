document.getElementById("loginForm").addEventListener("submit", async (e) => {
    // Impede o comportamento padrão de recarregar a página ao enviar o formulário
    e.preventDefault();

    // Obtém o valor do campo de entrada de nome de usuário
    const username = document.getElementById("username").value;
    // Obtém o valor do campo de entrada de senha
    const password = document.getElementById("password").value;

    try {
        // Faz uma requisição POST para o endpoint de login na API
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST", // Define o método HTTP como POST
            headers: { "Content-Type": "application/json" }, // Define o cabeçalho do tipo de conteúdo como JSON
            body: JSON.stringify({ username, password }) // Converte os dados do usuário para JSON e os inclui no corpo da requisição
        });

        // Verifica se a resposta da API indica sucesso (status HTTP 200)
        if (response.ok) {
            // Converte a resposta para JSON para acessar o token gerado
            const data = await response.json();
            
            // Armazena o token de autenticação no localStorage para acessos futuros
            localStorage.setItem("token", data.token);
            
            // Armazena o nome do usuário também no localStorage (para não pedir login novamente em outras páginas)
            localStorage.setItem("usuarioLogado", JSON.stringify({ nome: username }));
            
            // Redireciona para a página inicial (index.html)
            window.location.href = "../index.html"; // Ajuste o caminho conforme sua estrutura
        } else {
            // Se o login falhar, exibe uma mensagem de erro para o usuário
            alert("Login falhou! Verifique seu usuário ou senha.");
        }
    } catch (error) {
        // Caso ocorra um erro na requisição, exibe o erro no console para análise
        console.error("Erro:", error);
    }
});
