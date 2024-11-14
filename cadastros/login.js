// Definindo email e senha corretos para simulação de login
const CORRECT_EMAIL = "user@example.com";
const CORRECT_PASSWORD = "password123";

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o formulário e o botão de login
    const loginForm = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const loginButton = document.querySelector(".login-btn");

    // Função para mostrar mensagens de erro
    function showErrorMessage(message) {
        // Remove a mensagem de erro antiga, se existir
        const existingError = document.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }

        // Cria um novo elemento para exibir a mensagem de erro
        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
        errorMessage.style.marginTop = "10px";
        
        // Insere a mensagem de erro no formulário
        loginForm.appendChild(errorMessage);
    }

    // Função para limpar mensagens de erro
    function clearErrorMessage() {
        const existingError = document.querySelector(".error-message");
        if (existingError) {
            existingError.remove();
        }
    }

    // Evento de submissão do formulário
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne o envio do formulário

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validação dos campos de email e senha
        if (email === "" || password === "") {
            showErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica as credenciais (email e senha fixos como exemplo)
        if (email === CORRECT_EMAIL && password === CORRECT_PASSWORD) {
            clearErrorMessage();
            alert("Login bem-sucedido!"); // Exibe mensagem de sucesso
            window.location.href = "../index.html"; // Redireciona para a home (simulação)
        } else {
            showErrorMessage("Email ou senha incorretos. Tente novamente.");
        }
    });

    // Evento para limpar a mensagem de erro ao digitar nos campos
    emailInput.addEventListener("input", clearErrorMessage);
    passwordInput.addEventListener("input", clearErrorMessage);
});
