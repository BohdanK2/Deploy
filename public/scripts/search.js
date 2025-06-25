const movies = [
  { title: "Minecraft", genre: "Action", image: "img/release1.jpg", rating: 4.5 },
  { title: "Sinners", genre: "Thriller", image: "img/release2.jpg", rating: 4.2 },
  { title: "Nonnas", genre: "Action", image: "img/release3.jpg", rating: 4.9 },
  { title: "Final Destination Bloodlines", genre: "Sci-Fi", image: "img/release4.jpg", rating: 3.8 },
  { title: "Until Dawn", genre: "Comedy", image: "img/release5.jpg", rating: 4.0 },

  { title: "Oppenheimer", genre: "Action", image: "img/trend1.jpg", rating: 4.8 },
  { title: "VHS 94", genre: "Thriller", image: "img/trend2.jpg", rating: 4.6 },
  { title: "Smile 2", genre: "Animation", image: "img/trend3.jpg", rating: 4.7 },
  { title: "Heart Eyes", genre: "Sci-Fi", image: "img/trend4.jpg", rating: 4.4 },
  { title: "Cabin", genre: "Drama", image: "img/trend5.jpg", rating: 4.3 },

  { title: "The Karate Kid", genre: "Action", image: "img/must1.jpg", rating: 4.9 },
  { title: "Jocker", genre: "Drama", image: "img/must2.jpg", rating: 4.8 },
  { title: "Venom: Last Dance", genre: "Musical", image: "img/must3.jpg", rating: 4.1 },
  { title: "Deadpool", genre: "Comedy", image: "img/must4.jpg", rating: 4.2 },
  { title: "Man in Black II", genre: "Action", image: "img/must5.jpg", rating: 4.3 },

  { title: "Avatar: The way of water", genre: "Action", image: "img/action1.jpg", rating: 4.6 },
  { title: "Batman", genre: "Action", image: "img/action2.jpg", rating: 4.5 },
  { title: "Kill Bill", genre: "Action", image: "img/action3.jpg", rating: 4.3 },
  { title: "Mission Impossible", genre: "Thriller", image: "img/action4.jpg", rating: 4.4 },
  { title: "Mortal Kombat", genre: "Action", image: "img/action5.jpg", rating: 4.2 },

  { title: "Hobbit the Desolation of Smaug", genre: "Adventure", image: "img/adventure1.jpg", rating: 4.1 },
  { title: "The Power of the Dog", genre: "Comedy", image: "img/adventure2.jpg", rating: 4.0 },
  { title: "The Last of US", genre: "Adventure", image: "img/adventure3.jpg", rating: 4.7 },
  { title: "Rambo", genre: "Sci-Fi", image: "img/adventure4.jpg", rating: 4.9 },
  { title: "1899", genre: "Comedy", image: "img/adventure5.jpg", rating: 4.5 },

  { title: "SAW III", genre: "Horror", image: "img/horror1.jpg", rating: 4.1 },
  { title: "Monkey", genre: "Thriller", image: "img/horror2.jpg", rating: 4.3 },
  { title: "The Nun II", genre: "Horror", image: "img/horror3.jpg", rating: 3.8 },
  { title: "IT", genre: "Horror", image: "img/horror4.jpg", rating: 4.5 },
  { title: "Screeam Therapy", genre: "Thriller", image: "img/horror5.jpg", rating: 4.7 },

  { title: "American Pie", genre: "Comedy", image: "img/comedy1.jpg", rating: 4.6 },
  { title: "Zohan", genre: "Comedy", image: "img/comedy2.jpg", rating: 4.2 },
  { title: "Scary Movie", genre: "Comedy", image: "img/comedy3.jpg", rating: 4.4 },
  { title: "Guardians of the Galaxy 2", genre: "Comedy", image: "img/comedy4.jpg", rating: 4.0 },
  { title: "Birds of Prey", genre: "Comedy", image: "img/comedy5.jpg", rating: 4.3 },

  { title: "Titanic", genre: "Drama", image: "img/drama1.jpg", rating: 4.8 },
  { title: "The most powerful man in the world", genre: "Drama", image: "img/drama2.jpg", rating: 4.6 },
  { title: "Flight Risk", genre: "Drama", image: "img/drama3.jpg", rating: 4.5 },
  { title: "Amateur", genre: "Biography", image: "img/drama4.jpg", rating: 4.2 },
  { title: "Blue Ruin", genre: "Drama", image: "img/drama5.jpg", rating: 4.7 }
];

const input = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results-container");
function renderResults(filtered) {
  resultsContainer.innerHTML = "";

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "card-search";
  card.innerHTML = `
  <div class="card-image-container-search">
    <img src="${movie.image}" alt="${movie.title}" class="movie-poster-search">
  </div>
  <p class="movie-title-search">${movie.title}</p>
  <div class="movie-rating">
    <span class="star">★</span>
    <span class="score">${movie.rating}</span>
    <span class="meta">| ${movie.genre}</span>
  </div>
`;
    resultsContainer.appendChild(card);
  });
}


input.addEventListener("input", () => {
  const query = input.value.toLowerCase().trim();
  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(query)
  );
  renderResults(filtered);
});


renderResults(movies);
