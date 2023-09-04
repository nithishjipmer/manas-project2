const RIGHT_HEN_SRC = "images/chicken_left.jpg";
const LEFT_HEN_SRC = "images/chicken_right.jpg";
const INVERSION_PROBABLITY = 0.55;
const HEN_DISPLAY_TIME = 1000;
const MINIMUM_DISPLAY_TIME = 200;
const FEEDBACK_DISPLAY_TIME = 300;

const images = document.querySelectorAll("img");
const imageList = [LEFT_HEN_SRC, RIGHT_HEN_SRC];
const questionContainer = document.getElementById("question-container");
const feedbackContainer = document.getElementById("feedback-container");

var hensNotSame = false;
var score = 0;
var lives = 3;
let timerInterval; // Variable to store the timer interval
let secondsLeft = 60;

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
  // show hen images
  showImages(true);

  // hide question container
  questionContainer.setAttribute("style", "display: none");

  document.getElementById("timerDiv").style.display = "block";
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
  // Display Q and options
  questionContainer.setAttribute("style", "display: block");
}

function showImages(shouldShow) {
  if (shouldShow) {
    // randomImg = imageList[Math.floor(Math.random() * imageList.length)];
    images.forEach(function (image) {
      // image.src = randomImg;
      image.style.display = "block";
    });
  } else {
    images.forEach(function (image) {
      image.style.display = "none";
    });
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

function gameOver() {
  // Set the score in the modal
  document.getElementById("scoreValue").textContent = score;

  // Show the game over modal
  $("#gameOverModal").modal("show");
}

function showFeedbackSymbol(response) {
  feedbackContainer.setAttribute("style", "display: block");
  showImages(false);
  questionContainer.setAttribute("style", "display: none");
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
    showImages(true);
    loopGame();
  }, FEEDBACK_DISPLAY_TIME);
}

screen.orientation.lock("landscape");

document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    // Hide the button after clicking
    this.style.display = "none";

    // Call the function to start the game
    startGame();
  });
