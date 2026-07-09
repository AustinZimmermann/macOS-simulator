document.addEventListener("DOMContentLoaded", () => {
    // Dynamic system clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        document.getElementById('clock').textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Load Localized Content from Data.json Mock
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('apple-logo').textContent = data.menuBar.apple;
            document.getElementById('menu-app').textContent = data.menuBar.appName;
            document.getElementById('menu-file').textContent = data.menuBar.file;
            document.getElementById('menu-edit').textContent = data.menuBar.edit;
            document.getElementById('menu-emu').textContent = data.menuBar.emulation;
            document.getElementById('menu-view').textContent = data.menuBar.view;
            
            document.getElementById('windowTitle').textContent = `Dolphin - ${data.gameInfo.title} (${data.gameInfo.region})`;
            document.getElementById('pressStart').textContent = data.gameInfo.titleScreenText;
            document.getElementById('gameFooter').textContent = data.gameInfo.copyright;
        })
        .catch(err => console.error("Error loading localization properties:", err));

    // Basic Window UI management Actions
    const win = document.getElementById('dolphinWindow');
    document.getElementById('closeBtn').addEventListener('click', () => win.style.display = 'none');
    document.getElementById('minBtn').addEventListener('click', () => win.style.opacity = '0.3');
    document.getElementById('maximize').style.cursor = 'pointer'; // Simple placeholder action mappings
});