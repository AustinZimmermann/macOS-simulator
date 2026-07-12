document.addEventListener("DOMContentLoaded", () => {
    // Media DOM items
    const video = document.getElementById("video-element");
    const playBtn = document.getElementById("ctrl-play");
    const stopBtn = document.getElementById("ctrl-stop");
    const rwBtn = document.getElementById("ctrl-rw");
    const ffBtn = document.getElementById("ctrl-ff");
    const progressBar = document.getElementById("progress-bar");
    const volumeSlider = document.getElementById("volume-slider");
    const fileInput = document.getElementById("file-input");
    const mediaStatus = document.getElementById("media-status");
    const mainActions = document.getElementById("main-actions");

    // Dynamic Localization UI updates
    const langData = {
        "menuBar": { "apple": "", "player": "AnyMP4 Blu-ray Player", "file": "ファイル", "control": "コントロール", "audio": "音声", "video": "ビデオ" },
        "app": { "title": "AnyMP4 ブルーレイ プレーヤー", "openFile": "ファイルを開く", "openDisc": "ディスクを開く", "noMedia": "メディアが読み込まれていません", "playing": "再生中: " }
    };

    function initLocalization() {
        document.getElementById("menu-app-name").innerText = langData.menuBar.player;
        document.getElementById("menu-file").innerText = langData.menuBar.file;
        document.getElementById("menu-control").innerText = langData.menuBar.control;
        document.getElementById("menu-audio").innerText = langData.menuBar.audio;
        document.getElementById("menu-video").innerText = langData.menuBar.video;
        document.getElementById("window-title").innerText = langData.app.title;
        document.getElementById("txt-open-file").innerText = langData.app.openFile;
        document.getElementById("txt-open-disc").innerText = langData.app.openDisc;
        mediaStatus.innerText = langData.app.noMedia;
    }
    initLocalization();

    // Live Clock on Menu Bar
    function updateClock() {
        const now = new Date();
        document.getElementById("current-time").innerText = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Trigger Local File Uploads
    document.getElementById("btn-open-file").addEventListener("click", () => fileInput.click());
    document.getElementById("btn-open-disc").addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            loadMedia(file.name, URL.createObjectURL(file));
        }
    });

    function loadMedia(name, url) {
        video.src = url;
        video.style.display = "block";
        mainActions.style.display = "none";
        mediaStatus.innerText = langData.app.playing + name;
        video.play();
        playBtn.innerText = "⏸";
    }

    // Window Playback Control Handlers
    playBtn.addEventListener("click", () => {
        if (!video.src) return;
        if (video.paused) {
            video.play();
            playBtn.innerText = "⏸";
        } else {
            video.pause();
            playBtn.innerText = "▶";
        }
    });

    stopBtn.addEventListener("click", () => {
        if (!video.src) return;
        video.pause();
        video.currentTime = 0;
        playBtn.innerText = "▶";
    });

    rwBtn.addEventListener("click", () => { video.currentTime -= 10; });
    ffBtn.addEventListener("click", () => { video.currentTime += 10; });

    // Progress updates
    video.addEventListener("timeupdate", () => {
        if(video.duration) {
            progressBar.value = (video.currentTime / video.duration) * 100;
        }
    });

    progressBar.addEventListener("input", () => {
        if(video.duration) {
            video.currentTime = (progressBar.value / 100) * video.duration;
        }
    });

    volumeSlider.addEventListener("input", (e) => {
        video.volume = e.target.value;
    });

    // Window Dragging Feature
    const win = document.getElementById("player-window");
    const header = win.querySelector(".window-header");
    let isDragging = false, startX, startY, initialX, initialY;

    header.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = win.offsetLeft;
        initialY = win.offsetTop;
        win.style.position = 'absolute';
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        win.style.left = `${initialX + dx}px`;
        win.style.top = `${initialY + dy}px`;
        win.style.transform = 'none'; // Clear setup translation when manually dragged
    });

    document.addEventListener("mouseup", () => isDragging = false);
});