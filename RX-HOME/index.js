// Language selector
const languageSelector = document.getElementById('language-selector');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        LanguageManager.setLanguage(e.target.value);
    });
}

// Smooth scroll for platform cards
document.querySelectorAll('.cGoDL').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const downloadSection = document.querySelector('#download');
        if (downloadSection) {
            smoothScrollTo(downloadSection, 500);
        }
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            smoothScrollTo(target, 500);
        }
    });
});

// Matrix Rain Effect
const canvas = document.querySelector('.matrix-rain');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const mockup = document.querySelector('.player-mockup');
    
    // Set canvas size
    const resizeCanvas = () => {
        const rect = mockup.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops = Array(columns).fill(0);
    
    let animationId = null;
    let isHovering = false;
    let hoverStartTime = 0;
    let logoOpacity = 0;
    
    // Load logo image
    const logoImg = new Image();
    //logoImg.src = 'img/rx01.webp';
    logoImg.src = 'img/matrix.webp';

    const draw = () => {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.5 ? '1' : '0';
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        // Draw logo with fade-in effect after 2.5 seconds
        const elapsed = Date.now() - hoverStartTime;
        if (elapsed > 2500) {
            const fadeProgress = Math.min((elapsed - 2500) / 1000, 1); // 1 second fade duration
            logoOpacity = fadeProgress * 0.3; // Max opacity 0.3 for subtle effect
            
            if (logoImg.complete) {
                ctx.save()
                ctx.globalAlpha = logoOpacity;
                const logoWidth = canvas.width * 0.4;
                const logoHeight = logoWidth * (logoImg.height / logoImg.width);
                const logoX = (canvas.width - logoWidth) / 2;
                const logoY = (canvas.height - logoHeight) / 2;
                
                // 画像をdivideで描画
                ctx.globalCompositeOperation = 'screen';
                ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
                ctx.restore();
                ctx.globalAlpha = 1;
            }
        }
        
        if (isHovering) {
            animationId = requestAnimationFrame(draw);
        }
    };

    mockup.addEventListener('mouseenter', () => {
        isHovering = true;
        hoverStartTime = Date.now();
        logoOpacity = 0;
        drops.fill(0);
        draw();
    });

    mockup.addEventListener('mouseleave', () => {
        isHovering = false;
        logoOpacity = 0;
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}