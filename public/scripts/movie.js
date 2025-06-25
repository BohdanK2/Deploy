
function openMoviePage(title, img, description) {
  localStorage.setItem("selectedMovie", JSON.stringify({ title, img, description }));
  window.location.href = "movie.html";
}
document.addEventListener("DOMContentLoaded", () => {
  const movie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (movie) {
    const titleEl = document.getElementById("movie-title");
    const imgEl = document.getElementById("movie-img");
    const descEl = document.getElementById("movie-description");

    if (titleEl) titleEl.textContent = movie.title;
    if (imgEl) imgEl.src = movie.img;
    if (descEl) descEl.textContent = movie.description;
  }
});
