document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const menuToggle = document.getElementById("mobile-menu");
    const navMenu = document.querySelector("nav");

  
   // ==========================================================================
    // CAMINHO DO ÁUDIO (Pasta sound na raiz)
    // ==========================================================================
    const soundPath = window.location.pathname.includes("/pages/")
        ? "../sounds/click.mp3"
        : "sounds/click.mp3";

    const clickSound = new Audio(soundPath);
    clickSound.preload = "auto";

    // Carrega o áudio
    clickSound.load();

    // ==========================
    // FADE
    // ==========================

    const overlay = document.createElement("div");
    overlay.className = "fade-overlay";
    body.appendChild(overlay);

    setTimeout(() => {
        body.classList.add("loaded");
    }, 50);

    // ==========================
    // SOM
    // ==========================

    function playClick() {

        clickSound.pause();
        clickSound.currentTime = 0;

        clickSound.play().catch(err => {
            console.log("Erro ao tocar áudio:", err);
        });

    }

  // ==========================================================================
    // MENU MOBILE
    // ==========================================================================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            playClick();
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // ==========================================================================
    // DELEGAÇÃO DE EVENTOS DE ALTA PERFORMANCE (Substitui o .forEach de links)
    // ==========================================================================
    document.addEventListener("click", (e) => {
        // Verifica se o elemento clicado (ou algum pai dele) é um link (tag <a>)
        const link = e.target.closest("a");
        if (!link) return;

        playClick();

        const href = link.getAttribute("href");
        const isExternal = link.getAttribute("target") === "_blank";

        // Filtra links internos, âncoras vazias ou scripts vazios
        if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
            return;
        }

        // Se for aba externa (redes sociais), deixa o navegador agir nativamente
        if (isExternal) {
            return;
        }

        // Bloqueia a mudança instantânea para rodar o efeito de Fade Out
        e.preventDefault();
        overlay.classList.add("active");

        setTimeout(() => {
            window.location.href = href;
        }, 220); // Otimizado para 220ms (mais rápido e responsivo ao toque)
    });
});