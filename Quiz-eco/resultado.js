document.addEventListener("DOMContentLoaded", () => {
  const acertos = localStorage.getItem("quizAcertos");
  if (acertos !== null) {
    document.getElementById("respostas-certas").innerText = acertos;
  }
});
