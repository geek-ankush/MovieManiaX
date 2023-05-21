// OMDB API Key
const omdb_api = "6036219f";

// DOM Element
let searchBar = document.querySelector(".search-input");
let movieCardTemplate = document.querySelector(".movie-card-template");
let searchButton = document.querySelector(".search-btn");

//Variables
var previousSearchString = "";
var searchString = "";
let movieCards = [];
let searchHistory = [];

// EVENT LISTENER FOR SEARCH BUTTON
searchButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Fetch the current search string
  searchString = searchBar.value.trim();

  // Remove previous search results
  for (let movieCard of movieCards) {
    const container = document.querySelector(".movie-cards-container");
    container.removeChild(movieCard);
  }

  // Empty the array of search history
  searchHistory.splice(0, searchHistory.length);

  // Empty the array of movie cards
  movieCards.splice(0, movieCards.length);
  createMovieCard(searchString);
});

// EVENT LISTENER FOR SEARCH BAR
searchBar.addEventListener("input", (event) => {
  // Fetch the current search string
  searchString = searchBar.value.trim();

  // If the previous search string is not same as the current search string
  // then only display the search results
  if (searchString != previousSearchString) {
    createMovieCard(searchString);
  }
  // Update current search as previous search
  previousSearchString = searchString;
});

function createMovieCard(searchString) {
  // Fetch the Data corresponding to the search string from the API
  fetch(`https://www.omdbapi.com/?apikey=${omdb_api}&t=${searchString}`)
    .then((response) => response.json())
    .then((data) => {
      // Create a clone node of the Template
      let movieCard = movieCardTemplate.content
        .querySelector(".movie-card")
        .cloneNode(true);

      // Store the fetched data
      const movieName = data.Title;
      const imdbRating = data.imdbRating;
      const releaseDate = data.Released;
      const language = data.Language;
      const country = data.Country;
      const poster = data.Poster;
      const imdbID = data.imdbID;

      // Check if it is a valid movie
      if (
        imdbID != null &&
        imdbID != undefined &&
        imdbID != NaN &&
        !searchHistory.includes(imdbID)
      ) {
        // Update the movie info in the template
        const moviePosterImg = movieCard.querySelector(".movie-poster img");

        // If the movie poster is not available, use a placeholder image
        if (
          poster != null &&
          poster != undefined &&
          poster != NaN &&
          poster != "N/A"
        ) {
          moviePosterImg.setAttribute("src", poster);
        } else {
          moviePosterImg.setAttribute("src", "./img/placeholder.jpg");
        }

        const movieID = movieCard.querySelector(".imdb-id");
        movieID.innerHTML = imdbID;

        const movieTitle = movieCard.querySelectorAll(".movie-info-val")[0];
        movieTitle.innerHTML = movieName;

        const movieRating = movieCard.querySelectorAll(".movie-info-val")[1];
        movieRating.innerHTML = imdbRating;

        const movieReleaseDate = movieCard.querySelectorAll(
          ".movie-info-val"
        )[2];
        movieReleaseDate.innerHTML = releaseDate;

        const movieLanguage = movieCard.querySelectorAll(".movie-info-val")[3];
        movieLanguage.innerHTML = language;

        const movieCountry = movieCard.querySelectorAll(".movie-info-val")[4];
        movieCountry.innerHTML = country;

        // Add the card to container
        const container = document.querySelector(".movie-cards-container");
        const newNode = container.insertBefore(movieCard, container.firstChild);

        // Assign the new id for the movieCard
        const newId = "movie-card-" + imdbID;
        newNode.id = newId;

        // If the movieCard is created add it to movieCars Array
        if (newNode != null && newNode != undefined && newNode != NaN) {
          searchHistory.push(imdbID);
          movieCards.push(newNode);
          // To Initialize the event listeners
          const favButton = newNode.querySelector(".fav-btn-container");
          favButton.addEventListener("click", (event) => {
            event.preventDefault();
            toggleFavorite(newNode);
            event.stopPropagation();
          });
          // To Initialize the event listeners
          callModal(newNode);
        }

        // If array length exceeds 4 start deleting..
        if (movieCards.length > 4) {
          const oldestMovieCard = movieCards.shift();
          const oldestID = oldestMovieCard.id.substring(
            11,
            oldestMovieCard.id.length
          );
          // Remove the element from DOM
          container.removeChild(oldestMovieCard);
          // Remove it from search history
          searchHistory.shift();
        }

        return newNode;
      }
    })
    .catch((error) => console.error(error));
}
