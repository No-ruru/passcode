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
});
