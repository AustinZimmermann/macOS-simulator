// 時計の更新機能
function updateClock() {
    const now = new Date();
    const years = now.getFullYear();
    const months = String(now.getMonth() + 1).padStart(2, '0');
    const dates = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 日本語圏で馴染みのあるフォーマット (例: 7月15日(水) 21:28)
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];
    
    document.getElementById('clock').textContent = `${months}月${dates}日(${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// ウィンドウ制御システム
let activeWindow = null;
let zIndexCounter = 10;

function openWindow(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    focusWindow(win);
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

function minimizeWindow(id) {
    const win = document.getElementById(id);
    win.style.transform = 'scale(0.8)';
    win.style.opacity = '0';
    setTimeout(() => {
        win.style.display = 'none';
        win.style.transform = 'scale(1)';
        win.style.opacity = '1';
    }, 200);
}

function focusWindow(win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}

function toggleMaximize(id) {
    const win = document.getElementById(id);
    if (win.style.width === '100vw') {
        win.style.width = '500px';
        win.style.height = '350px';
        win.style.top = '100px';
        win.style.left = '100px';
    } else {
        win.style.width = '100vw';
        win.style.height = 'calc(100vh - 25px)';
        win.style.top = '25px';
        win.style.left = '0px';
    }
}

// ドラッグ & ドロップ機能
let dragObj = null;
let offsetX = 0;
let offsetY = 0;

function dragStart(event, id) {
    dragObj = document.getElementById(id);
    focusWindow(dragObj);
    offsetX = event.clientX - dragObj.offsetLeft;
    offsetY = event.clientY - dragObj.offsetTop;

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
}

function dragMove(event) {
    if (dragObj) {
        // メニューバーより下に制限
        let topY = event.clientY - offsetY;
        if (topY < 25) topY = 25; 
        
        dragObj.style.left = (event.clientX - offsetX) + 'px';
        dragObj.style.top = topY + 'px';
    }
}

function dragEnd() {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    dragObj = null;
}

// 各ウィンドウのクリック時に最前面に持ってくる
document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
});