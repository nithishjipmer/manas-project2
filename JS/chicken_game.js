const RIGHT_HEN_SRC = "../images/chicken_left.png";
const LEFT_HEN_SRC = "../images/chicken_right.png";
const INVERSION_PROBABLITY = 0.5;
const HEN_DISPLAY_TIME = 1000;
const MINIMUM_DISPLAY_TIME = 400;
const FEEDBACK_DISPLAY_TIME = 200;
const TOTAL_TIME = 60;

const images = document.querySelectorAll(".chicken");
const imageList = [LEFT_HEN_SRC, RIGHT_HEN_SRC];
const feedbackContainer = document.getElementById("feedback-container");
const yesbtn = document.getElementsByClassName("answer-btn")[0];
const nobtn = document.getElementsByClassName("answer-btn")[1];

var score = 0;
var lives = 3;

function startGame() {
  yesbtn.style.display = "inline";
  nobtn.style.display = "inline";
  // Start the timer
  progress(60, TOTAL_TIME, document.getElementById("progressBar"));

  tryInvertHen();
  setTimeout(askQuestion, 2000);
}

function isEqual() {
  const rightElements = document.querySelectorAll(".right");
  const rightSrcList = Array.from(rightElements).map((element) =>
    element.getAttribute("src")
  );
  const leftElements = document.querySelectorAll(".left");
  const leftSrcList = Array.from(leftElements).map((element) =>
    element.getAttribute("src")
  );
  const areListsEqual =
    JSON.stringify(rightSrcList) === JSON.stringify(leftSrcList);

  if (areListsEqual) {
    return true;
  } else {
    return false;
  }
}

function tryInvertHen() {
  // Probablity to invert
  if (Math.random() < INVERSION_PROBABLITY) {
    if (Math.random() > 0.5) {
      // Invert one hen
      invertOneHen();
    } else {
      // invert one whole col
      invertOneHenCol();
    }
  } else {
    randomImg = imageList[Math.floor(Math.random() * imageList.length)];
    images.forEach(function (image) {
      image.src = randomImg;
      image.style.display = "block";
    });
  }
}

function invertOneHen() {
  // Select a random hen
  const randomIndex = Math.floor(Math.random() * images.length);
  const randomHen = images[randomIndex];
  if (randomHen.src.includes(RIGHT_HEN_SRC)) {
    randomHen.src = LEFT_HEN_SRC;
  } else {
    randomHen.src = RIGHT_HEN_SRC;
  }
}

function invertOneHenCol() {
  randomImg1 = imageList[Math.floor(Math.random() * imageList.length)];
  randomImg2 = imageList[Math.floor(Math.random() * imageList.length)];
  images.forEach(function (image) {
    if (image.className == "right") {
      image.src = randomImg1;
    } else {
      image.src = randomImg2;
    }
    image.style.display = "block";
  });
}

function resetGame() {
  location.reload();
}

let timeoutId;

function loopGame() {
  // hide question container
  tryInvertHen();
  showImages(true);

  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(askQuestion, 1500);
}

function askQuestion() {
  // hide all hens
  showImages(false);
}

function showImages(shouldShow) {
  let imageContainer = document.getElementsByClassName("images-container")[0];
  if (shouldShow) {
    imageContainer.style.display = "flex";
  } else {
    imageContainer.style.display = "none";
  }
}
function answer(response) {
  yesbtn.style.display = "none";
  nobtn.style.display = "none";
  var isSame = isEqual();
  console.log(isSame);
  if (response == isSame) {
    // answer correct
    score += 10;
    showFeedbackSymbol(true);
  } else {
    // answer wrong
    lives -= 1;
    removeLife();
    showFeedbackSymbol(false);
  }
  updateScreen();
}

function updateScreen() {
  document.getElementById("score").innerText = score;
  const heartIcons = document.querySelectorAll(".heart-icon");
  // heartIcons[lives].classList = [];
}

function removeLife() {
  if (lives >= 0) {
    const heartIcons = document.querySelectorAll(".heart-icon");
    heartIcons[lives].classList.add("lost-life");
    if (lives == 0) {
      gameOver();
    }
  }
}

// Function to restart the game
function restartGame() {
  const gameOverDiv = document.getElementById("gameOverDiv");
  gameOverDiv.style.display = "none";

  resetGame();
}

function gameOver() {
  // hide bg
  showImages(false);
  yesbtn.style.display = "none";
  nobtn.style.display = "none";
  document.getElementById("progressBar").style.display = "none";
  document.getElementById("msg").style.display = "none";

  // show gameover
  const gameOverDiv = document.getElementById("gameOverDiv");
  const scoreDisplay = document.getElementById("scoreDisplay");
  const highscoreDisplay = document.getElementById("highscoreDisplay");
  scoreDisplay.textContent = score;
  gameOverDiv.style.display = "block";

  // highscore
  var highscore = getHighScore("highscore");
  highscoreDisplay.textContent = highscore;
  if (score > highscore) {
    setHighScore("highscore", score);
  }
}

function showFeedbackSymbol(response) {
  feedbackContainer.setAttribute("style", "display: block");
  showImages(false);
  if (response) {
    feedbackContainer.textContent = "✔️";
    feedbackContainer.classList.add("tick-symbol");
  } else {
    feedbackContainer.textContent = "❌";
    feedbackContainer.classList.add("wrong-symbol");
  }
  setTimeout(() => {
    feedbackContainer.textContent = "";
    feedbackContainer.classList.remove("tick-symbol");
    feedbackContainer.setAttribute("style", "display: none");

    if (lives > 0 && isEqual()) {
      loopGame();
      yesbtn.style.display = "inline";
      nobtn.style.display = "inline";
    }
  }, FEEDBACK_DISPLAY_TIME);
}

document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    // Hide the button after clicking
    this.style.display = "none";

    // Call the function to start the game
    startGame();
  });

// bar timer
function progress(timeleft, timetotal, element) {
  var progressBar = element.querySelector("div");
  var progressBarWidth = (timeleft * element.offsetWidth) / timetotal;

  progressBar.style.width = progressBarWidth + "px";
  progressBar.innerHTML = Math.floor(timeleft / 60) + ":" + (timeleft % 60);

  if (timeleft > 0) {
    setTimeout(function () {
      progress(timeleft - 1, timetotal, element);
    }, 1000);
  } else {
    gameOver();
  }
}

// high score logic
function setHighScore(id, val) {
  localStorage.setItem(id, val);
}

function getHighScore(id) {
  const highscore = localStorage.getItem(id);
  if (highscore == null) {
    return 0;
  }
  return highscore;
}
