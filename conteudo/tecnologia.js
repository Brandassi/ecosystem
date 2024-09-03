document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".play-button");

  playButton.addEventListener("click", function () {
    
    playButton.classList.add("clicked");
    setTimeout(() => {
      playButton.classList.remove("clicked");
    }, 300); 
  });
});
