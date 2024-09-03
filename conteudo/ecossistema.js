document.addEventListener("DOMContentLoaded", () => {
  const fecharBtn = document.querySelector(".fechar");
  if (fecharBtn) {
    fecharBtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "../index.html";
    });
  }

  const jogarBtn = document.querySelector(".jogar");
  if (jogarBtn) {
    jogarBtn.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "../Quiz-eco/eco.html";
    });
  }
});
