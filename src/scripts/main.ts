export {};

const datamuleEl = document.querySelector(".settings-mule");
if (datamuleEl instanceof HTMLElement && datamuleEl.dataset.navHero) {
  console.log("in datamule");

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
