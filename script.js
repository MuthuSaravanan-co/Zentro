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
  // Optionally save theme
}

function logout() {
  alert("Logged out!");
}

// Hide menus if clicking outside
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
    // Add more sections here if needed
  };

  function showOnly(selectedKey) {
    for (const key in tabs) {
      if (selectedKey === "all") {
        tabs[key].style.display = "block"; // Show all sections
      } else {
        tabs[key].style.display = (key === selectedKey) ? "block" : "none";
      }
    }
  }

  // Initial section
  showOnly("all");

  // Tab buttons
  document.querySelector(".all").addEventListener("click", () => showOnly("all"));
  document.querySelector(".music").addEventListener("click", () => showOnly("music"));
});

// Audio player
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
    audio.src = songPath;
    audio.play();
    songTitle.textContent = title;
    playerCover.src = cover;
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

function togglePlayPauseFromBar() {
  togglePlayPause();
}

// Progress bar update
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
  }
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
