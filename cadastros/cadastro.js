// Função para validar o formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");
    const confirmPasswordInput = document.querySelectorAll("input[type='password']")[1];

    // Função para validar email
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Função para validar senha
    function isPasswordStrong(password) {
        return password.length >= 6; // Exemplo de validação: ao menos 6 caracteres
    }

    // Função para exibir alerta e cancelar envio do formulário
    function showAlert(message) {
        alert(message);
    }

    // Evento de envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio do formulário para fazer validações

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Validação do campo de email
        if (!isValidEmail(email)) {
            showAlert("Por favor, insira um email válido.");
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

        // Se todas as validações passarem, enviar os dados (simulado)
        showAlert("Cadastro realizado com sucesso!");
        form.reset(); // Limpa o formulário após o envio bem-sucedido

        // Aqui você pode adicionar código para enviar os dados ao servidor usando fetch ou XMLHttpRequest
    });
});
