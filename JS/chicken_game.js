const RIGHT_HEN_SRC = "../images/chicken_left.jpg";
const LEFT_HEN_SRC = "../images/chicken_right.jpg";
const INVERSION_PROBABLITY = 0.25;
const HEN_DISPLAY_TIME = 1000;
const MINIMUM_DISPLAY_TIME = 400;
const FEEDBACK_DISPLAY_TIME = 200;

const images = document.querySelectorAll("img");
const imageList = [LEFT_HEN_SRC, RIGHT_HEN_SRC];
const feedbackContainer = document.getElementById("feedback-container");
const timer = document.getElementById("timerDiv");

var hensNotSame = false;
var score = 0;
var lives = 3;
let timerInterval; // Variable to store the timer interval
let secondsLeft = 60;


function tryInvertHen() {
  roundNumber++;
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
    hensNotSame = false;
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
  hensNotSame = true;
}

function invertOneHenCol() {
  randomImg1 = imageList[Math.floor(Math.random() * imageList.length)];
  randomImg2 = imageList[Math.floor(Math.random() * imageList.length)];
  console.log(randomImg1);
  console.log(randomImg2);
  images.forEach(function (image) {
    console.log(image.className);
    if (image.className == "right") {
      image.src = randomImg1;
    } else {
      image.src = randomImg2;
    }
    image.style.display = "block";
  });

  if (randomImg1 == randomImg2) {
    hensNotSame = false;
  } else {
    hensNotSame = true;
  }
}

function startGame() {
  timer.style.visibility = "visible";
  // Start the timer
  timerInterval = setInterval(function () {
    secondsLeft--;
    document.getElementById("timer").textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval); // Stop the timer
      gameOver(); // Call the game over function
    }
  }, 1000);

  tryInvertHen();
  setTimeout(askQuestion, 2000);
}

function resetGame() {
  score = 0;
  lives = 3;
  secondsLeft = 60;
  timer.style.visibility = "visible";
  tryInvertHen();
  setTimeout(askQuestion, 2000);
}

function returnDisplayTime() {
  let delta = HEN_DISPLAY_TIME - 2000 / secondsLeft;
  if (HEN_DISPLAY_TIME > 2000 / secondsLeft + MINIMUM_DISPLAY_TIME) {
    return delta;
  }
  return MINIMUM_DISPLAY_TIME;
}

function loopGame() {
  // hide question container
  tryInvertHen();
  setTimeout(askQuestion, returnDisplayTime());
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

  if (!response == hensNotSame) {
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
}

function removeLife() {
  console.log(lives);
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
  // clear bg
  timer.setAttribute("style", "visibility: hidden");

  // show gameover
  const gameOverDiv = document.getElementById("gameOverDiv");
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.textContent = score;
  gameOverDiv.style.display = "block";
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

    if (lives > 0) {
      showImages(true);
      loopGame();
    }
  }, FEEDBACK_DISPLAY_TIME);
}

// function lock() {
//   if (
//     navigator.userAgent.match(/Android/i) ||
//     navigator.userAgent.match(/iPhone/i) ||
//     navigator.userAgent.match(/BlackBerry/i) ||
//     navigator.userAgent.match(/Windows Phone/i)
//   ) {
//     let de = document.documentElement;
//     if (de.requestFullscreen) {
//       de.requestFullscreen();
//     }
//     screen.orientation.lock("landscape");
//   }
// }

document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    // Hide the button after clicking
    this.style.display = "none";

    // Call the function to start the game
    startGame();
  });
