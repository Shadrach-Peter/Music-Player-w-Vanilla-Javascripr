const musicContainer = document.querySelector(".music-container");
const prevBtn = document.querySelector("#prev");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const songTitle = document.querySelector("#song-title");
const TrackCoverPicture = document.querySelector("#cover");
const imageContainer = document.querySelector(".image-container");

//Song Titles
const songs = [
  "for KING & COUNTRY - Love Me Like I Am (Official Music Video)",
  "Maroon 5 - Memories x Canon in D (Piano Cover by Riyandi Kusuma)",
  "Teddy Swims - You're Still The One (Shania Twain Cover)",
  "OFFICIAL Somewhere over the Rainbow - Israel IZ Kamakawiwoʻole",
  "Toto - Africa (Official HD Video)",
  "Jesus Is Coming Soon (Live At Gaither Studios Alexandria IN 1994)",
  "Dionne Warwick  Thats What Friends Are For",
];

//Keep Track of songs
let songsIndex = 0;

//intially load songs into the DOM
loadSongs(songs[songsIndex]);

//Update songs detail
function loadSongs(song) {
  songTitle.innerHTML = song;
  audio.src = `music/${song}.mp3`;
  TrackCoverPicture.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function prevSong() {
  songsIndex--;
  if (songsIndex < 0) {
    songsIndex = songs.length - 1;
  }

  loadSongs(songs[songsIndex]);
  playSong();
}

function nextSong() {
  songsIndex++;
  if (songsIndex > songs.length - 1) {
    songsIndex = 0;
  }
  loadSongs(songs[songsIndex]);
  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

//Event Listners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change Songs Event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
