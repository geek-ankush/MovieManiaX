// Function to Call the Popup Screen
function callModal(openButton) {
  const closeButton = document.querySelector("[data-close-modal]");
  const modal = document.getElementById("modal-dialog");

  // Update the content of the modal with the selected movie's information
  updateModelContent(openButton.querySelector(".imdb-id").innerHTML);

  // Show the modal when the open button is clicked
  openButton.addEventListener("click", () => {
    modal.showModal();
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener("click", () => {
    modal.close();
  });
}

// Function to update the popup screen
function updateModelContent(movieID) {
  // Get the modal and its child elements
  const modal = document.querySelector("[data-modal]");

  // Fetch the movie information from the OMDB API using its ID
  if (movieID != undefined && movieID != null && movieID != NaN) {
    fetch(`https://www.omdbapi.com/?apikey=${omdb_api}&i=${movieID}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the modal with the movie information
        const poster = data.Poster;
        const moviePosterImg = modal.querySelector(".movie-poster img");
        const movieInfo = modal.querySelectorAll(".movie-info-val");
        moviePosterImg.setAttribute("src", poster);

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

        const movieTitle = movieInfo[0];
        movieTitle.innerHTML = data.Title;

        const movieYear = movieInfo[1];
        movieYear.innerHTML = data.Year;

        const movieReleaseDate = movieInfo[2];
        movieReleaseDate.innerHTML = data.Released;

        const movieRating = movieInfo[3];
        movieRating.innerHTML = data.imdbRating;

        const movieRunTime = movieInfo[4];
        movieRunTime.innerHTML = data.Runtime;

        const movieGenre = movieInfo[5];
        movieGenre.innerHTML = data.Genre;

        const movieDirector = movieInfo[6];
        movieDirector.innerHTML = data.Director;

        const movieWriter = movieInfo[7];
        movieWriter.innerHTML = data.Writer;

        const movieActors = movieInfo[8];
        movieActors.innerHTML = data.Actors;

        const moviePlot = movieInfo[9];
        moviePlot.innerHTML = data.Plot;
      });
  }
}

// Function to store the favorites
function toggleFavorite(movieCard) {
  const favIcon = movieCard.querySelector("#fav-btn");
  const movieID = movieCard.id.substring(11, movieCard.id.length);

  // check if the movie is already in the favorites list
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const index = favorites.indexOf(movieID);

  console.log(index);

  // if the movie is not in the favorites list, add it and update the icon color
  if (index === -1) {
    favorites.push(movieID);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favIcon.style.color = "red";
    console.log("Added");
  }
  // if the movie is already in the favorites list, remove it and update the icon color
  else {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    favIcon.style.color = "grey";
    console.log("Removed");
  }
}
