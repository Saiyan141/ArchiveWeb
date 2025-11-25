const hexOpener = document.querySelector("#hex");
const menu = document.getElementById("menu");
const pages = document.querySelectorAll(".page");
const closeBtns = document.querySelectorAll("[data-close]");
const links = document.querySelectorAll("nav a");

let transitionLock = false;

function showOverlay(el) {
    if (!el) return;
    el.classList.add("show");
    el.focus();
}

function hideOverlay(el) {
    if (!el || !el.classList.contains("show")) return;
    el.classList.remove("show");
}

hexOpener.addEventListener('click', () => {
    if (transitionLock) return;
    showOverlay(menu);
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (transitionLock) return;
        transitionLock = true;
        
        pages.forEach(p => hideOverlay(p));
        hideOverlay(menu);
        
        setTimeout(() => {
            transitionLock = false;
            hexOpener.focus();
        }, 650); 
    });
});

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        if (transitionLock) return;
        transitionLock = true;

        const targetPageId = link.dataset.page;
        const targetPage = document.getElementById(targetPageId);
        
        hideOverlay(menu);
        showOverlay(targetPage);

        setTimeout(() => {
            transitionLock = false;
        }, 650); 
    });
});
