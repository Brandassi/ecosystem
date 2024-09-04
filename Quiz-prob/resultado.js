document.addEventListener('DOMContentLoaded', () => {
    const respostasCertas = document.getElementById('respostas-certas');
    const acertos = localStorage.getItem('acertos') || 0;
    respostasCertas.textContent = acertos;
    localStorage.removeItem('acertos');
});
