document.addEventListener('DOMContentLoaded', () => {
    let playlist = [];
    let currentIndex = -1;
    let isPlaying = false;
    let playbackInterval = null;
    let currentSeconds = 0;
    let totalSeconds = 0;

    // DOM Elements
    const playlistContainer = document.getElementById('playlist-tracks');
    const btnPlay = document.getElementById('btn-play');
    const btnStop = document.getElementById('btn-stop');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const progressBar = document.getElementById('progress-bar');
    const timeCurrent = document.getElementById('time-current');
    const timeTotal = document.getElementById('time-total');
    const windowTitle = document.getElementById('window-title');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    const trackInfo = document.getElementById('track-info');
    const vlcLogo = document.getElementById('vlc-logo');

    // Fetch Playlist Data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            playlist = data;
            renderPlaylist();
            if(playlist.length > 0) {
                selectTrack(0, false);
            }
        })
        .catch(err => console.error("プレイリストの読み込みに失敗しました:", err));

    function renderPlaylist() {
        playlistContainer.innerHTML = '';
        playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = index === currentIndex ? 'active' : '';
            li.innerHTML = `
                <span>${track.title}</span>
                <span class="duration">${track.duration}</span>
            `;
            li.addEventListener('click', () => selectTrack(index, true));
            playlistContainer.appendChild(li);
        });
    }

    function selectTrack(index, autoPlay = true) {
        if (index < 0 || index >= playlist.length) return;
        
        currentIndex = index;
        const track = playlist[currentIndex];

        // Parse duration (MM:SS) to seconds
        const parts = track.duration.split(':');
        totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
        currentSeconds = 0;

        // UI Updates
        windowTitle.textContent = `${track.title} - VLC メディアプレイヤー`;
        currentTitle.textContent = track.title;
        currentArtist.textContent = track.artist;
        trackInfo.style.display = 'block';
        timeTotal.textContent = track.duration;
        updateProgressUI();

        renderPlaylist();

        if (autoPlay) {
            playTrack();
        } else {
            stopTrack();
        }
    }

    function playTrack() {
        if (currentIndex === -1 && playlist.length > 0) {
            selectTrack(0, true);
            return;
        }

        isPlaying = true;
        btnPlay.textContent = '⏸';
        btnPlay.title = '一時停止';
        vlcLogo.classList.add('playing');

        clearInterval(playbackInterval);
        playbackInterval = setInterval(() => {
            if (currentSeconds < totalSeconds) {
                currentSeconds++;
                updateProgressUI();
            } else {
                nextTrack();
            }
        }, 1000);
    }

    function pauseTrack() {
        isPlaying = false;
        btnPlay.textContent = '▶';
        btnPlay.title = '再生';
        vlcLogo.classList.remove('playing');
        clearInterval(playbackInterval);
    }

    function stopTrack() {
        pauseTrack();
        currentSeconds = 0;
        updateProgressUI();
    }

    function nextTrack() {
        if (currentIndex < playlist.length - 1) {
            selectTrack(currentIndex + 1, true);
        } else {
            selectTrack(0, true); // Loop to start
        }
    }

    function prevTrack() {
        if (currentIndex > 0) {
            selectTrack(currentIndex - 1, true);
        }
    }

    function formatTime(secs) {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    function updateProgressUI() {
        timeCurrent.textContent = formatTime(currentSeconds);
        const percentage = totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;
        progressBar.value = percentage;
    }

    // Event Listeners
    btnPlay.addEventListener('click', () => {
        if (isPlaying) pauseTrack(); else playTrack();
    });
    btnStop.addEventListener('click', stopTrack);
    btnNext.addEventListener('click', nextTrack);
    btnPrev.addEventListener('click', prevTrack);

    progressBar.addEventListener('input', (e) => {
        if (totalSeconds > 0) {
            const percentage = e.target.value;
            currentSeconds = Math.floor((percentage / 100) * totalSeconds);
            timeCurrent.textContent = formatTime(currentSeconds);
        }
    });
});