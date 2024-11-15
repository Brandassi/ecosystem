// Função para validar o formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#registerForm"); // Formulário de cadastro
    const usernameInput = document.querySelector("#registerUsername"); // Campo de nome de usuário
    const passwordInput = document.querySelector("#registerPassword"); // Campo de senha
    const confirmPasswordInput = document.querySelector("#registerConfirmPassword"); // Campo de confirmação de senha

    // Função para validar o nome de usuário (exemplo de validação simples)
    function isValidUsername(username) {
        return username.length >= 3; // Exemplo de validação: pelo menos 3 caracteres
    }

    // Função para validar senha (exemplo de validação simples)
    function isPasswordStrong(password) {
        return password.length >= 6; // Exemplo de validação: pelo menos 6 caracteres
    }

    // Função para exibir alerta e cancelar envio do formulário
    function showAlert(message) {
        alert(message);
    }

    // Evento de envio do formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o envio do formulário para fazer validações

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validação do nome de usuário
        if (!isValidUsername(username)) {
            showAlert("O nome de usuário deve ter pelo menos 3 caracteres.");
            return;
        }

        // Validação da força da senha
        if (!isPasswordStrong(password)) {
            showAlert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Validação da confirmação de senha
        if (password !== confirmPassword) {
            showAlert("As senhas não coincidem. Verifique e tente novamente.");
            return;
        }

        // Se todas as validações passarem, enviar os dados para a API
        try {
            // Fazendo a requisição POST para a API de cadastro
            const response = await fetch("http://localhost:3000/api/register", {
                method: "POST", // Método HTTP para envio de dados
                headers: { "Content-Type": "application/json" }, // Cabeçalho indicando que os dados são em JSON
                body: JSON.stringify({ username, password }) // Envia os dados no formato JSON
            });

            // Verifica se a resposta da API é bem-sucedida (status HTTP 200 ou 201)
            if (response.ok) {
                showAlert("Cadastro realizado com sucesso!");
                window.location.href = "index.html"; // Redireciona para a página de login
            } else {
                // Se a resposta for erro, mostra a mensagem de erro da API
                const data = await response.json();
                showAlert(data.message); // Exibe a mensagem de erro da resposta
            }
        } catch (error) {
            // Caso ocorra um erro na requisição
            console.error("Erro:", error);
            showAlert("Erro ao realizar o cadastro. Tente novamente.");
        }
    });
});
