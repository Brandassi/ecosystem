document.addEventListener('DOMContentLoaded', () => {
    const respostasCertas = document.getElementById('respostas-certas');
    const botaoRepetir = document.querySelector('.botao-repetir');
    const botaoRepetirNovamente = document.querySelector('.botao-repetir-novamente');
    
    // Recupera o número de acertos do localStorage
    const acertos = localStorage.getItem('acertos') || 0;
    respostasCertas.textContent = acertos;

    // Limpa o localStorage após exibir o resultado
    localStorage.removeItem('acertos');

    // Adiciona redirecionamento aos botões
    botaoRepetir.addEventListener('click', () => {
        window.location.href = 'outra_pagina.html';
    });

    botaoRepetirNovamente.addEventListener('click', () => {
        window.location.href = 'quest.html';
    });
});
