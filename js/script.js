const hexWrap = document.querySelector(".hex-wrap");
const arcText = document.getElementById("arc");
const menu = document.getElementById("menu");
const pages = document.querySelectorAll(".page");
const closeBtns = document.querySelectorAll("[data-close]");
const links = document.querySelectorAll("nav a");

let transitionLock = false;

// Slide in overlay/page
function showOverlay(el) {
  if (transitionLock) return;
  transitionLock = true;

  el.classList.remove("close");
  el.style.display = "block";

  // allow browser to register display change
  requestAnimationFrame(() => {
    el.classList.add("show");
  });

  const content = el.querySelector('.content');
  content.style.opacity = 0;

  // fade in text after slide
  setTimeout(() => {
    content.style.opacity = 1;
  }, 350);

  setTimeout(() => {
    transitionLock = false;
  }, 650);
}

// Slide out overlay/page
function hideOverlay(el) {
  if (!el.classList.contains("show")) return;
  if (transitionLock) return;

  transitionLock = true;
  const content = el.querySelector('.content');
  content.style.opacity = 0;

  el.classList.remove("show");
  el.classList.add("close");

  function handleTransformEnd(e) {
    if (e.propertyName === "transform") {
      el.style.display = "none";
      el.classList.remove("close");
      el.removeEventListener("transitionend", handleTransformEnd);
      transitionLock = false;
    }
  }

  el.addEventListener("transitionend", handleTransformEnd);
}

// Hex + ARC click
hexWrap.onclick = () => showOverlay(menu);
arcText.onclick = () => showOverlay(menu);

// Close buttons
closeBtns.forEach(btn => {
  btn.onclick = () => {
    hideOverlay(menu);
    pages.forEach(p => hideOverlay(p));
  };
});

// Menu links
links.forEach(link => {
  link.onclick = () => {
    // Lock the transition until the menu has finished sliding out
    hideOverlay(menu);
    
    // Wait for menu to fully close before showing page
    setTimeout(() => {
      const page = document.getElementById(link.dataset.page);
      showOverlay(page);
    }, 600); // Wait for the menu's slide-out transition to complete
  };
});
