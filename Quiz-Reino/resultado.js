document.addEventListener('DOMContentLoaded', () => {
    const respostasCertas = document.getElementById('correct-answers');
    const acertos = localStorage.getItem('acertos') || 0;
    respostasCertas.textContent = acertos;

    
    localStorage.removeItem('acertos');
});
