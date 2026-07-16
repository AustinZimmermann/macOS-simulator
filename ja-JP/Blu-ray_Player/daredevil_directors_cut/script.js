// App State Tracker
let isPlaying = false;
let currentMovieTime = 0;
const totalMovieDuration = 7980; // 2 hours, 13 minutes in seconds
let playbackInterval = null;

// DOM Selectors
const bdMainMenu = document.getElementById('bd-main-menu');
const videoPlayer = document.getElementById('video-player');
const menuOverlay = document.getElementById('menu-overlay');
const popupMenu = document.getElementById('popup-menu');
const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const progressFill = document.getElementById('progress-fill');
const currentTimeDisplay = document.getElementById('current-time');

// Menu Controls
function openMenuSection(sectionId) {
    menuOverlay.classList.remove('hidden');
    // Hide all submenus
    document.querySelectorAll('.submenu-content').forEach(el => el.classList.add('hidden'));
    // Show selected submenu
    document.getElementById(`sec-${sectionId}`).classList.remove('hidden');
}

function closeMenuSection() {
    menuOverlay.classList.add('hidden');
}

// Playback Logic
function startMovie() {
    bdMainMenu.classList.add('hidden');
    videoPlayer.classList.remove('hidden');
    playMovieSystem();
}

function startMovieAt(minutes) {
    currentMovieTime = minutes * 60;
    closeMenuSection();
    startMovie();
}

function playMovieSystem() {
    isPlaying = true;
    playIcon.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'); // Switch to Pause Icon
    
    clearInterval(playbackInterval);
    playbackInterval = setInterval(() => {
        if (currentMovieTime < totalMovieDuration) {
            currentMovieTime++;
            updateProgress();
        } else {
            returnToMainMenu();
        }
    }, 1000);
}

function pauseMovieSystem() {
    isPlaying = false;
    playIcon.setAttribute('d', 'M8 5v14l11-7z'); // Switch to Play Icon
    clearInterval(playbackInterval);
}

function togglePlay() {
    if (videoPlayer.classList.contains('hidden')) {
        startMovie();
    } else {
        if (isPlaying) {
            pauseMovieSystem();
        } else {
            playMovieSystem();
        }
    }
}

// Media Scrubber Control
function seek(event) {
    if (videoPlayer.classList.contains('hidden')) return;
    const rect = document.getElementById('progress-bar-container').getBoundingClientRect();
    const clickPosition = (event.clientX - rect.left) / rect.width;
    currentMovieTime = Math.floor(clickPosition * totalMovieDuration);
    updateProgress();
}

function updateProgress() {
    const percentage = (currentMovieTime / totalMovieDuration) * 100;
    progressFill.style.width = `${percentage}%`;
    currentTimeDisplay.textContent = formatTime(currentMovieTime);
}

// Time formatter (HH:MM:SS)
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

// Pop-up Overlay controls
function togglePopupMenu() {
    if (videoPlayer.classList.contains('hidden')) return;
    popupMenu.classList.toggle('hidden');
}

function closePopupMenu() {
    popupMenu.classList.add('hidden');
}

function returnToMainMenu() {
    pauseMovieSystem();
    closePopupMenu();
    videoPlayer.classList.add('hidden');
    bdMainMenu.classList.remove('hidden');
    currentMovieTime = 0;
    updateProgress();
}

function toggleAudioSubtitles() {
    closePopupMenu();
    bdMainMenu.classList.remove('hidden');
    openMenuSection('audio-setup');
}

// Simple dynamic keyboard support
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    }
    if (e.code === 'KeyM') {
        togglePopupMenu();
    }
});