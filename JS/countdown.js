const startButton = document.getElementById("startButton");
const questionsDiv = document.getElementById("countdown-questions");
const impulseInput = document.getElementById("impulseInput");
const stillWantInput = document.getElementById("stillWantInput");
const consequencesInput = document.getElementById("consequencesInput");

startButton.addEventListener("click", startTimer);

function showQuestions() {
  questionsDiv.style.display = "block";
}

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

let stillWant = null;

// Add click event listeners to the Yes and No buttons
yesButton.addEventListener("click", function () {
  stillWant = true;
  submitAnswers();
});

noButton.addEventListener("click", function () {
  stillWant = false;
  submitAnswers();
});

function submitAnswers() {
  const impulse = impulseInput.value;
  const consequences = consequencesInput.value;

  startButton.disabled = false;
  impulseInput.value = "";
  consequencesInput.value = "";

  const messageElement = document.createElement("div");
  messageElement.classList.add("text-center");
  messageElement.innerHTML =
    "<h4>Take a Pause and Make Informed Choices</h4>" +
    "<p> Remember, the power to make informed choices lies within you. Take a pause, consider the consequences, and make decisions that align with your goals and values.</p>" +
    "<br>" +
    "<a href='../index.html#impulse-log-section'><button class='btn btn-success'>Home</button></a>";

  if (impulse == "" || consequences == "") {
    return;
  }

  addEntry(impulse, consequences, stillWant);

  questionsDiv.style.display = "none";
  document
    .getElementsByClassName("countdown-card")[0]
    .appendChild(messageElement);
}


function addEntry(string1, string2, booleanValue) {
  const timestamp = new Date().toISOString();

  const entry = {
    impulse: string1,
    consequences: string2,
    stillWant: booleanValue,
    timestamp: timestamp,
  };


  let entries = JSON.parse(localStorage.getItem("myEntries")) || [];

  entries.push(entry);

  localStorage.setItem("myEntries", JSON.stringify(entries));
}


const FULL_DASH_ARRAY = 283;
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = "green";

document.getElementById("timer").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

function onTimesUp() {
  // hide timer and header
  document.getElementsByClassName("countdown-header")[0].style.display = "none";
  document.getElementById("timer").innerHTML = "";
  clearInterval(timerInterval);
  showQuestions();
}

function startTimer() {
  // show toast
  simpleToast();
  // hide start btn
  document.getElementById("startButton").style.display = "none";
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML =
      formatTime(timeLeft);
    setCircleDasharray();

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function simpleToast() {
  // var x = document.getElementById("simpleToast");
  // x.className = "show";
  // setTimeout(function () {
  //   x.className = x.className.replace("show", "");
  // }, 3000);
}
