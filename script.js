const moviesObject = {
  "🏡😱": ["Sam u kuci", "Home alone"],
  "🧙‍♂️👓⚡": "Harry Potter",
  "❓👦❌🧔": "Sto je muskarac bez brkova",
  "💑🚢🥶": ["Titanic", "Titanik"],
  "2️⃣⛹️‍♂️⛹️‍♂️🪑🪑": "Dva igraca s klupe",
  "👩🌹🐻": ["Ljepotica i zvijer", "beauty and the beast"],
  "🤡🎈": ["Ono", "It"],
  "🥋🐼": "Kung fu panda",
  "🐍✈": ["Zmije u avionu", "Snakes on a plane"],
  "❔▶🔫🏝": "Kako je poceo rat na mom otoku",
  "💀⚰🎙🎵": "Kad mrtvi zapjevaju",
  "🦌": "Jelenko",
  "👩🐂": "Sonja i bik",
  "6️⃣🚌": "Sesti autobus",
  "👑♟": "Queens gambit",
  "👑👨‍🦲💍💍": ["Gospodar prstenova", "Lord of the rings"],
  "👨🏻‍🤝‍👨🏻🎥👻": "Paranormal activity",
  "🐺🗽💰": ["Vuk s Wall streeta", "The wolf of wall street"],
  "🎲🏰🪑👑": ["Igra prijestolja", "Game of thrones"],
  "🔨🧔": "Thor",
};

const tries = 3;
let score = 0;
let remainingTries = tries;
let currentMovieEmoji = "";
let currentMovieTitle = "";
let nextMovieIndex = 0;

const movieInput = document.getElementById("guess-input");

movieInput.addEventListener("click", function () {
  if (movieInput.value === "Enter the movie") {
    movieInput.value = "";
  }
});

let remainingMovies = Object.keys(moviesObject);

function selectRandomMovie() {
  if (remainingMovies.length === 0) {
    alert(`Score: ${score}`);
    return null;
  }

  const randomIndex = Math.floor(Math.random() * remainingMovies.length);
  const randomMovieEmoji = remainingMovies[randomIndex];
  remainingMovies.splice(randomIndex, 1);

  return randomMovieEmoji;
}

// Function to update the UI with the current movie
function updateCurrentMovie() {
  currentMovieEmoji = selectRandomMovie();
  currentMovieTitle = moviesObject[currentMovieEmoji];
  document.querySelector("#movie-emoji").textContent = currentMovieEmoji;
  document.querySelector(
    "#chanceCount"
  ).textContent = `Number of tries: ${remainingTries}`;
  document.querySelector("#scoreCount").textContent = `Current score: ${score}`;
}

// Function to handle user's guess
function handleGuess() {
  const guess = document.querySelector("#guess-input").value.toLowerCase();

  if (Array.isArray(currentMovieTitle)) {
    if (
      currentMovieTitle.some((title) => title.toLowerCase().includes(guess))
    ) {
      score++;
      remainingTries = tries;
      document.querySelector("#scoreCount").textContent = score;
      updateCurrentMovie();
    } else {
      remainingTries--;
      document.querySelector(
        "#chanceCount"
      ).textContent = `Number of tries: ${remainingTries}`;
      if (remainingTries === 0) {
        remainingTries = tries;
        updateCurrentMovie();
      }
    }
  } else {
    if (guess === currentMovieTitle.toLowerCase()) {
      score++;
      remainingTries = tries;
      document.querySelector("#scoreCount").textContent = score;
      updateCurrentMovie();
    } else {
      remainingTries--;
      document.querySelector(
        "#chanceCount"
      ).textContent = `Number of tries: ${remainingTries}`;
      if (remainingTries === 0) {
        remainingTries = tries;
        updateCurrentMovie();
      }
    }
  }

  document.querySelector("#guess-input").value = "";
}

// Event listener for guess form submit
document
  .querySelector("#guess-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    handleGuess();
  });

// Initialize the game with the first movie
updateCurrentMovie();
