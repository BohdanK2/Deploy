const container = document.getElementById("favourites-container");
let favs = JSON.parse(localStorage.getItem("nextview_favourites")) || [];

function renderFavourites() {
  container.innerHTML = "";

  if (favs.length === 0) {
    container.innerHTML = "<p>No favourites yet.</p>";
    return;
  }

  favs.forEach((film, index) => {
    const card = document.createElement("div");
    card.classList.add("fav-card");
    card.innerHTML = `
      <img src="${film.img}" alt="${film.title}" />
      <p>${film.title}</p>
      <button class="btn red" onclick="removeFromFavourites(${index})">🗑 Remove</button>
    `;
    container.appendChild(card);
  });
}

function removeFromFavourites(index) {
  favs.splice(index, 1);
  localStorage.setItem("nextview_favourites", JSON.stringify(favs));
  renderFavourites();
}

renderFavourites();
