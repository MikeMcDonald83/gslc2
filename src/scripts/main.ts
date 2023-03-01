export {};

const datamuleEl = document.querySelector(".settings-mule");
if (datamuleEl instanceof HTMLElement && datamuleEl.dataset.navHero) {
  const navbarEl = document.querySelector(".navbar");
  navbarEl?.classList.add("transparent");
  if (navbarEl instanceof HTMLElement) {
    navbarEl.style.position = "fixed";
    navbarEl.style.width = "100%";

    window.addEventListener("scroll", () => {
      if (window.scrollY < 20) {
        navbarEl.classList.add("transparent");
      } else {
        navbarEl.classList.remove("transparent");
      }
    });
  }
}

(function prependBase() {
  document.querySelectorAll("a").forEach((link) => {
    let url = link.getAttribute("href");
    if (url?.startsWith("/")) {
      url = import.meta.env.BASE_URL + url.slice(1);
      link.setAttribute("href", url);
    }
  });
})();
