document.addEventListener("DOMContentLoaded", () => {
    const clockElement = document.getElementById("clock");
    const finderWindow = document.getElementById("finder-window");
    const dockFinder = document.getElementById("dock-finder");
    const closeBtn = document.getElementById("close-btn");
    const finderContent = document.getElementById("finder-content");
    
    let mockData = {};

    // 1. 時計のリアルタイム更新
    function updateClock() {
        const now = new Date();
        const options = { 
            month: 'short', 
            day: 'numeric', 
            weekday: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        // 日本語ロケールでフォーマット (例: 7月8日(水) 22:10)
        clockElement.textContent = now.toLocaleDateString('ja-JP', options).replace(/,/g, '');
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 2. data.json からデータを取得
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            mockData = data;
            // 初期表示として「最近の項目」をレンダリング
            renderContent('recents');
        })
        .catch(error => console.error("データの読み込みに失敗しました:", error));

    // 3. コンテンツの描画関数
    function renderContent(category) {
        finderContent.innerHTML = '';
        const items = mockData[category] || [];

        if (items.length === 0) {
            finderContent.innerHTML = '<p style="color: #999; font-size: 13px; grid-column: 1/-1; text-align: center;">項目なし</p>';
            return;
        }

        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'file-item';
            
            // タイプに応じた絵文字アイコンの割り当て
            let icon = '📄';
            if (item.type === 'folder') icon = '📁';
            else if (item.type === 'image') icon = '🖼️';
            else if (item.type === 'text') icon = '📝';

            itemDiv.innerHTML = `
                <div class="file-icon">${icon}</div>
                <div class="file-name">${item.name}</div>
            `;
            finderContent.appendChild(itemDiv);
        });
    }

    // 4. サイドバーのナビゲーション切り替え
    const navItems = {
        'nav-recents': 'recents',
        'nav-documents': 'documents',
        'nav-downloads': 'downloads'
    };

    Object.keys(navItems).forEach(id => {
        document.getElementById(id).addEventListener('click', (e) => {
            // アクティブクラスの切り替え
            document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
            e.target.classList.add('active');
            
            // コンテンツの切り替え
            renderContent(navItems[id]);
        });
    });

    // 5. ウィンドウの開閉ロジック
    dockFinder.addEventListener('click', () => {
        finderWindow.style.display = 'flex';
        dockFinder.classList.add('window-active');
    });

    closeBtn.addEventListener('click', () => {
        finderWindow.style.display = 'none';
        dockFinder.classList.remove('window-active');
    });

    // ウィンドウの簡易ドラッグ機能
    const header = finderWindow.querySelector('.window-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        if(e.target.classList.contains('control')) return; // ボタン選択時はドラッグしない
        isDragging = true;
        offsetX = e.clientX - finderWindow.offsetLeft;
        offsetY = e.clientY - finderWindow.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        finderWindow.style.left = `${e.clientX - offsetX}px`;
        finderWindow.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});