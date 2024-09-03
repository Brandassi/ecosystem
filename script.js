document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("transparente");
    } else {
      header.classList.remove("transparente");
    }
  });

  document
    .querySelector('a[href="#sobre-nos"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("sobre-nos")
        .scrollIntoView({ behavior: "smooth" });
    });

  const quizCards = document.querySelectorAll(".quiz-card");

  quizCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "scale(1.05)";
      card.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });
  });
});
