document.addEventListener("DOMContentLoaded", () => {
  const acertos = localStorage.getItem("acertos");
  const respostasCertasElement = document.getElementById("correct-answers");
  
  if (acertos !== null) {
    respostasCertasElement.textContent = acertos;
  }

  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
