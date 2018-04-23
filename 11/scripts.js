// Grabbing elements from HTML
const videoPlayer = document.querySelector(".player");
const video = videoPlayer.querySelector(".viewer");
const progress = videoPlayer.querySelector(".progress");
const progressBar = videoPlayer.querySelector(".progress__filled");
const toggle = videoPlayer.querySelector(".toggle");
const skipButtons = videoPlayer.querySelectorAll("[data-skip]");
const ranges = videoPlayer.querySelectorAll(".player__slider");
const fullScreenButton = videoPlayer.querySelector(".fullScreen");

// Functions
function togglePlay() {
	// // ES6
	// const method = video.paused ? 'play' : 'pause';
	// video[method]();
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

function updateToggle() {
	const icon = this.paused ? "►" : "❚ ❚";
	toggle.textContent = icon;
}

function skipVideo() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleVideoProgress() {
	const percent = video.currentTime / video.duration * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrubVideo(event) {
	const scrubTime = event.offsetX / progress.offsetWidth * video.duration;
	video.currentTime = scrubTime;
}

function handleFullScreen() {
	video.webkitRequestFullscreen();
}

// Event Listeners Start Here

// Playing/Pausing video
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

// Styling video progress bar
video.addEventListener("timeupdate", handleVideoProgress);

// Changing icon to play or pause
video.addEventListener("play", updateToggle);
video.addEventListener("pause", updateToggle);

// Skipping -10s or +25s
skipButtons.forEach(button => button.addEventListener("click", skipVideo));

//  Volume
ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

// Scrubbing video
let mousedown = false;
progress.addEventListener("click", scrubVideo);
progress.addEventListener("mousemove", event => {
	mousedown && scrubVideo(event);
});
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("up", () => (mousedown = false));

// Going full screen
fullScreenButton.addEventListener("click", handleFullScreen);
