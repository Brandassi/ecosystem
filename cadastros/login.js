// Adiciona um event listener para o evento de 'submit' no formulário com o ID 'loginForm'
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    // Impede o comportamento padrão de recarregar a página ao enviar o formulário
    e.preventDefault();

    // Obtém o valor do campo de entrada de nome de usuário
    const username = document.getElementById("username").value.trim();
    // Obtém o valor do campo de entrada de senha
    const password = document.getElementById("password").value.trim();

    // Função para mostrar mensagens de erro
    function showErrorMessage(message) {
        const errorMessageElement = document.querySelector(".error-message");
        if (errorMessageElement) {
            errorMessageElement.textContent = message;
        } else {
            const newErrorMessage = document.createElement("p");
            newErrorMessage.className = "error-message";
            newErrorMessage.textContent = message;
            newErrorMessage.style.color = "red";
            newErrorMessage.style.marginTop = "10px";
            document.getElementById("loginForm").appendChild(newErrorMessage);
        }
    }

    // Função para limpar mensagens de erro
    function clearErrorMessage() {
        const errorMessageElement = document.querySelector(".error-message");
        if (errorMessageElement) {
            errorMessageElement.remove();
        }
    }

    // Validação dos campos de login
    if (username === "" || password === "") {
        showErrorMessage("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Faz uma requisição POST para o endpoint de login na API
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST", // Define o método HTTP como POST
            headers: { "Content-Type": "application/json" }, // Define o cabeçalho do tipo de conteúdo como JSON
            body: JSON.stringify({ username, password }) // Envia os dados de login como JSON
        });

        // Verifica se a resposta da API indica sucesso (status HTTP 200 ou 201)
        if (response.ok) {
            // Converte a resposta para JSON para acessar o token gerado
            const data = await response.json();
            // Armazena o token de autenticação no localStorage para acessos futuros
            localStorage.setItem("token", data.token);
            // Redireciona para a página de boas-vindas após login bem-sucedido
            window.location.href = "welcome.html";
        } else {
            // Se o login falhar, exibe uma mensagem de erro para o usuário
            showErrorMessage("Login falhou. Verifique seu nome de usuário e senha.");
        }
    } catch (error) {
        // Caso ocorra um erro na requisição, exibe o erro no console para análise
        console.error("Erro:", error);
        showErrorMessage("Erro ao tentar fazer login. Tente novamente.");
    }
});

// Limpa a mensagem de erro ao digitar nos campos
document.getElementById("username").addEventListener("input", clearErrorMessage);
document.getElementById("password").addEventListener("input", clearErrorMessage);
