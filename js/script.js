document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const menuToggle = document.getElementById("mobile-menu");
    const navMenu = document.querySelector("nav");

    // Caminho Dinâmico do Áudio
    const soundPath = window.location.pathname.includes("/pages/")
        ? "../sounds/click.mp3"
        : "sounds/click.mp3";

    const clickSound = new Audio(soundPath);
    clickSound.preload = "auto";
    clickSound.load();

    // Fade-in inicial
    const overlay = document.createElement("div");
    overlay.className = "fade-overlay";
    body.appendChild(overlay);

    setTimeout(() => {
        body.classList.add("loaded");
    }, 50);

    // Sistema de Áudio
    function playClick() {
        clickSound.pause();
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.log("Áudio ignorado pelo navegador:", err));
    }

    // Toggle do Menu Mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            playClick();
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // Delegação de Eventos de Alta Performance (Redirecionamento com Fade Out)
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        playClick();

        const href = link.getAttribute("href");
        const isExternal = link.getAttribute("target") === "_blank";

        if (!href || href.startsWith("#") || href.startsWith("javascript:") || isExternal) {
            return;
        }

        e.preventDefault();
        overlay.classList.add("active");

        setTimeout(() => {
            window.location.href = href;
        }, 220);
    });
});