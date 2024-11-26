document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (não recarregar a página)

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Limpar a mensagem de feedback anterior
    const feedbackMessage = document.getElementById("feedbackMessage");
    feedbackMessage.style.display = 'none';

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
        feedbackMessage.textContent = "As senhas não coincidem. Por favor, tente novamente.";
        feedbackMessage.className = "feedback-message error"; // Adiciona a classe de erro
        feedbackMessage.style.display = 'block';
        return; // Não envia o formulário se as senhas não coincidirem
    }

    try {
        // Fazendo a requisição POST para a API
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            // Se o cadastro for bem-sucedido
            feedbackMessage.textContent = "Cadastro realizado com sucesso!";
            feedbackMessage.className = "feedback-message success"; // Adiciona a classe de sucesso
            feedbackMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = "../index.html"; // Redireciona para a página inicial
            }, 2000); // Espera 2 segundos antes de redirecionar
        } else {
            // Se houver erro na resposta
            const data = await response.json();
            feedbackMessage.textContent = data.message || "Erro no cadastro. Tente novamente.";
            feedbackMessage.className = "feedback-message error"; // Adiciona a classe de erro
            feedbackMessage.style.display = 'block';
        }
    } catch (error) {
        // Caso ocorra um erro na requisição
        console.error("Erro:", error);
        feedbackMessage.textContent = "Erro ao conectar ao servidor. Tente novamente.";
        feedbackMessage.className = "feedback-message error"; // Adiciona a classe de erro
        feedbackMessage.style.display = 'block';
    }
});
