const hexWrap = document.querySelector(".hex-wrap");
const arcText = document.getElementById("arc");
const menu = document.getElementById("menu");
const pages = document.querySelectorAll(".page");
const closeBtns = document.querySelectorAll("[data-close]");
const links = document.querySelectorAll("nav a");

// Slide in overlay/page
function showOverlay(el) {
  el.classList.remove("close");
  el.style.display = "block";
  requestAnimationFrame(()=>el.classList.add("show"));
  const content = el.querySelector('.content');
  content.style.opacity = 0;
  setTimeout(()=>{ content.style.opacity = 1; }, 300);
}

// Slide out overlay/page
function hideOverlay(el) {
  const content = el.querySelector('.content');
  content.style.opacity = 0;
  el.classList.remove("show");
  el.classList.add("close");
  el.addEventListener('transitionend', function handler() {
    el.style.display = "none";
    el.classList.remove("close");
    el.removeEventListener('transitionend', handler);
  });
}

// Hex and ARC click
hexWrap.onclick = () => showOverlay(menu);
arcText.onclick = () => showOverlay(menu);

// Close buttons
closeBtns.forEach(btn=>{
  btn.onclick = ()=>{
    hideOverlay(menu);
    pages.forEach(p=>hideOverlay(p));
  };
});

// Menu links
links.forEach(link=>{
  link.onclick = ()=>{
    hideOverlay(menu);
    showOverlay(document.getElementById(link.dataset.page));
  };
});
