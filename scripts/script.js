document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.description-btn');
    const modal = document.getElementById('modal');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-btn');
    const resetButton = document.getElementById('reset-filter');
    const tagButtons = document.querySelectorAll('.tags'); // タグボタンを取得
    const filterMenu = document.getElementById('filter-menu');
    const filterButton = document.getElementById('filter-list'); // 「絞り込み」ボタン


    // 説明文を取得する関数
    function loadDescription(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(text => callback(text))
            .catch(error => console.error('説明文の読み込みに失敗しました:', error));
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // ボタンのdata-description-url属性からファイルパスを取得
            const url = this.getAttribute('data-description-url');

            // 説明文を読み込み、モーダルに表示
            loadDescription(url, function(descriptionText) {
                modalDescription.textContent = descriptionText; // innerHTMLではなくtextContentを使用
                modal.style.display = 'block';
            });
        });
    });

    // モーダルの閉じるボタンをクリックしたとき
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // モーダル外をクリックしたときにモーダルを閉じる
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // ホームリンクをクリックしたときにページの一番上にスクロール
    const homeLink = document.getElementById('home-link');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault(); // デフォルトのアンカーリンクの動作を無効化
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        }); // ページの一番上にスムーズスクロール
    });

    // タグボタンをクリックしたときの処理
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.textContent.trim(); // ボタンのテキストを取得
            filterCards(tag); // カードをフィルタリング
        });
    });

    // カードのフィルタリング
    function filterCards(tag) {
        const cards = document.querySelectorAll('.card'); // 全てのカードを取得

        cards.forEach(card => {
            const cardTag = card.querySelector('.tags').textContent.trim(); // カードのタグを取得
            if (cardTag === tag || tag === '#すべて') {
                card.style.display = 'block'; // 一致するカードを表示
            } else {
                card.style.display = 'none'; // 一致しないカードを非表示
            }
        });
    }

    //すべてのカードを表示する
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            filterCards('#すべて'); // 全てのカードを表示
        });
    }




    // 「絞り込み」ボタンのクリックイベント
    filterButton.addEventListener('click', function() {
        // フィルタメニューの表示・非表示を切り替え
        if (filterMenu.style.display === 'none') {
            filterMenu.style.display = 'block';
        } else {
            filterMenu.style.display = 'none';
        }
    });

    // タグボタンの生成
    const tags = ['#すべて', '#アクション', '#パズル', '#タイピング', '#その他']; // タグの例
    tags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.textContent = tag;
        tagButton.className = 'tag-button';
        tagButton.addEventListener('click', function() {
            filterCards(tag); // フィルタリング関数の呼び出し
            filterMenu.style.display = 'none'; // メニューを非表示にする
        });
        filterMenu.appendChild(tagButton);
    });

    // フィルターメニュー外をクリックしたときにメニューを閉じる
    window.addEventListener('click', function(event) {
        if (event.target !== filterButton && !filterMenu.contains(event.target)) {
            filterMenu.style.display = 'none';
        }
    });
});
