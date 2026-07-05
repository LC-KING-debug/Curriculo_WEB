document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const menuToggle = document.getElementById("mobile-menu");
    const navMenu = document.querySelector("nav");

    // ==========================
    // CAMINHO DO ÁUDIO
    // ==========================

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

    // ==========================
    // MENU MOBILE
    // ==========================

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            playClick();

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");

        });

    }

    // ==========================
    // TODOS OS LINKS
    // ==========================

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function (e) {

            playClick();

            const href = this.getAttribute("href");

            const externo = this.target === "_blank";

            if (!href || href.startsWith("#") || href === "javascript:void(0);") {
                return;
            }

            if (externo) {
                return;
            }

            e.preventDefault();

            overlay.classList.add("active");

            setTimeout(() => {

                window.location.href = href;

            }, 250);

        });

    });

});