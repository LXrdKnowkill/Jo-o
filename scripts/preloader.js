// Preloader Logic (Custom Animation)
function setupPreloader() {
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderSymbol = document.getElementById('preloader-symbol');
    const preloaderName = document.getElementById('preloader-name');

    if (!preloader || !preloaderBar || !preloaderSymbol || !preloaderName) {
        console.error('Preloader elements missing!');
        if (preloader) preloader.style.display = 'none';
        return;
    }

    // Define imagem do Logo DuckEmpire - corrigindo caminho da imagem
    preloaderSymbol.innerHTML = '<img src="./Logo (1).png" alt="DuckEmpire Logo" class="w-24 h-24" onerror="this.onerror=null; this.src=\'Logo (1).png\'; console.error(\'Erro ao carregar logo, tentando caminho alternativo\');">';
    preloaderName.innerHTML = 'DuckEmpire';

    let width = 0;
    const intervalTime = 30;
    const totalDuration = 1500;
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;

    const interval = setInterval(() => {
        width += increment;
        if (width <= 100) {
            preloaderBar.style.width = width + '%';
        } else {
            clearInterval(interval);
            preloaderBar.style.width = '100%';

            // Simplificação: Tentar remover o preloader imediatamente após a barra carregar
            console.log('Barra carregada, tentando remover preloader imediatamente.');
            forceCompletePreloader(preloader);

            /* Código original comentado para teste:
            preloaderSymbol.style.opacity = '0';
            preloaderSymbol.style.transform = 'scale(0.8)';
            preloaderName.style.opacity = '1';
            preloaderName.style.transform = 'scale(1) translate(-50%, -50%)';

            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Forçar a remoção do preloader após um tempo máximo
                setTimeout(() => {
                    forceCompletePreloader(preloader);
                }, 1500);
                
                preloader.addEventListener('transitionend', () => {
                    forceCompletePreloader(preloader);
                }, { once: true });
            }, 600);
            */
        }
    }, intervalTime);

    document.querySelectorAll('.header-animate').forEach(el => {
        el.style.animationPlayState = 'paused';
    });
    document.body.classList.add('overflow-hidden');
}

function forceCompletePreloader(preloader) {
    if (preloader && preloader.style.display !== 'none') {
        console.log('Forçando conclusão do preloader');
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        document.querySelectorAll('.header-animate').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
}

// Execute preloader when DOM is loaded
document.addEventListener('DOMContentLoaded', setupPreloader);

// Backup: força o fechamento do preloader após 5 segundos
window.addEventListener('load', function() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.display !== 'none') {
            forceCompletePreloader(preloader);
        }
    }, 5000);
}); 