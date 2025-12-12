function dispFooter(){
    document.querySelector('footer').innerHTML = `
    <div class="container">
            <div class="footer-content">
                <div class="footer-brand">
                    <div class="logo">RX-01 Player</div>
                    <p data-i18n="footer.brand.desc">次世代言語学習動画プレイヤー</p>
                </div>
                <div class="footer-links">
                    <div class="footer-column">
                        <h4 data-i18n="footer.product">プロダクト</h4>
                        <a href="/#features" data-i18n="footer.features">特徴</a>
                        <a href="/#download" data-i18n="footer.download">ダウンロード</a>
                        <a href="/docs/" data-i18n="footer.docs">ドキュメント</a>
                    </div>
                    <div class="footer-column">
                        <h4 data-i18n="footer.support">サポート</h4>
                        <a href="/install/" data-i18n="footer.install">インストール方法</a>
                        <a href="/docs/" data-i18n="footer.docs">ドキュメント</a>
                        <a href="https://beta-japan.com/exis/" data-i18n="footer.contact">お問い合わせ</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p data-i18n="footer.copyright">&copy; 2026 RX-01 Player. All rights reserved.</p>
            </div>
        </div>`;
    
    // Re-apply translations after footer is rendered
    if (typeof LanguageManager !== 'undefined') {
        LanguageManager.updatePageContent();
    }
}

// Custom smooth scroll function with slower speed
function smoothScrollTo(target, duration = 1500) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smoother animation
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    requestAnimationFrame(animation);
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Language selector
document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('language-selector');
    if (langSelector && typeof LanguageManager !== 'undefined') {
        langSelector.addEventListener('change', (e) => {
            LanguageManager.setLanguage(e.target.value);
        });
    }
});

dispFooter();