
function toggleMenu() {
  const menu = document.getElementById("settingsMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function toggleThemeOptions() {
  const options = document.getElementById("themeOptions");
  options.style.display = (options.style.display === "block") ? "none" : "block";
}

function setTheme(color) {
  document.body.style.backgroundColor = color;
  // You can save to localStorage if needed
}

function logout() {
  alert("Logged out!");
}

document.addEventListener('click', function (event) {
  const settings = document.querySelector('.settings');
  if (!settings.contains(event.target)) {
    document.getElementById("settingsMenu").style.display = "none";
    document.getElementById("themeOptions").style.display = "none";
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const tabs = {
    all: document.querySelector(".content-section"),
    music: document.querySelector(".content-section1"),
    videos: document.querySelector(".content-section2"),
    news: document.querySelector(".content-section3")
  };

  function showOnly(selectedKey) {
    for (const key in tabs) {
      tabs[key].style.display = (key === selectedKey) ? "block" : "none";
    }
  }

  // Set initial section
  showOnly("all");

  // Tab event listeners
  document.querySelector(".all").addEventListener("click", () => showOnly("all"));
  document.querySelector(".music").addEventListener("click", () => showOnly("music"));
  document.querySelector(".videos").addEventListener("click", () => showOnly("videos"));
  document.querySelector(".news").addEventListener("click", () => showOnly("news"));
});

function playSong(songPath) {
  const audio = document.getElementById("audioPlayer");
  audio.src = songPath;
  audio.play().catch((err) => {
    alert("Audio playback blocked by browser. Please click on the page first.");
    console.error(err);
  });
}

let currentSong = null;
let isPlaying = false;
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const songTitle = document.getElementById("songTitle");
const playerCover = document.getElementById("playerCover");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

function togglePlayPause(card = null, songPath = null, title = "Unknown", cover = "images/cover.jpg") {
  if (songPath) {
    currentSong = songPath;
    audio.src = songPath;
    songTitle.textContent = title;
    playerCover.src = cover;
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  } else {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.textContent = "▶";
    } else {
      audio.play();
      playPauseBtn.textContent = "⏸";
    }
    isPlaying = !isPlaying;
  }
}

function togglePlayPauseFromBar() {
  togglePlayPause(); // no songPath means toggle current
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  durationDisplay.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
  playPauseBtn.textContent = "▶";
  isPlaying = false;
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function togglePlayPause(card = null, songPath = null, title = "Unknown", cover = "images/cover.jpg") {
  const audio = document.getElementById("audioPlayer");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const songTitle = document.getElementById("songTitle");
  const playerCover = document.getElementById("playerCover");

  // If a new song is clicked
  if (songPath) {
    audio.src = songPath;
    audio.play();

    songTitle.textContent = title; // ✅ Update the name
    playerCover.src = cover;       // ✅ Update the image

    playPauseBtn.textContent = "⏸";
    isPlaying = true;
  } else {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
      isPlaying = true;
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
      isPlaying = false;
    }
  }
}


