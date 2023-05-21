const omdb_api = "6036219f";

function getFavoriteMoviesDetails() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    console.log("No favorite movies found.");
    return;
  }

  // Fetch details for each favorite movie
  favorites.forEach((movieID) => {
    const apiUrl = `https://www.omdbapi.com/?apikey=${omdb_api}&i=${movieID}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let movieCardTemplate = document.querySelector(".movie-card-template");
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
        if (imdbID != null && imdbID != undefined && imdbID != NaN) {
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

          const movieLanguage = movieCard.querySelectorAll(
            ".movie-info-val"
          )[3];
          movieLanguage.innerHTML = language;

          const movieCountry = movieCard.querySelectorAll(".movie-info-val")[4];
          movieCountry.innerHTML = country;

          // Add the card to container
          const container = document.querySelector(".movie-cards-container");
          const newNode = container.insertBefore(
            movieCard,
            container.firstChild
          );

          // Assign the new id for the movieCard
          const newId = "movie-card-" + imdbID;
          newNode.id = newId;

          const favButton = newNode.querySelector(".fav-btn-container");
          favButton.addEventListener("click", (event) => {
            event.preventDefault();
            toggleFavorite(newNode);
            event.stopPropagation();
          });
          callModal(newNode);
        }
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  });
}

function setFavoriteButtonColor() {
  const favoriteButtons = document.querySelectorAll(".fav-btn-container");
  console.log(favoriteButtons);

  favoriteButtons.forEach((favButton) => {
    const favIcon = favButton.querySelector("#fav-btn");
    // const movieCard = favButton.closest('.movie-card');
    // const movieID = movieCard.id.substring(11);

    // // Check if the movieID exists in favorites
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // if (favorites.includes(movieID)) {
    favIcon.style.color = "red";
    // }
  });
}

getFavoriteMoviesDetails();
setFavoriteButtonColor();
