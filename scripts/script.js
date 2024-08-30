document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.description-btn');
    const modal = document.getElementById('modal');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.querySelector('.close-btn');

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
            top: -45, 
            behavior: 'smooth' 
        }); // ページの一番上にスムーズスクロール
    });

    const tagButtons = document.querySelectorAll('.tags'); // タグボタンを取得
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

    const resetButton = document.getElementById('reset-filter');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            filterCards('#すべて'); // 全てのカードを表示
        });
    }
});
