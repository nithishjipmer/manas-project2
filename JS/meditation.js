var track = document.getElementById("track");

var controlBtn = document.getElementById("play-pause");

function playPause() {
  if (track.paused) {
    track.play();
    controlBtn.innerHTML = '<i class="fas fa-pause"></i>'; // FontAwesome pause icon
  } else {
    track.pause();
    controlBtn.innerHTML = '<i class="fas fa-play"></i>'; // FontAwesome play icon
  }
}


controlBtn.addEventListener("click", playPause);
track.addEventListener("ended", function () {
  controlBtn.innerHTML = '<i class="fas fa-play"></i>';
});
