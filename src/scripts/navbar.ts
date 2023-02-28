export {};

const dropEls = document.querySelectorAll(".drop");
const navbarEl = document.querySelector(".navbar");

function removeDropActive(exceptEl?: HTMLElement) {
  if (exceptEl) {
    for (const dropEl of dropEls) {
      if (dropEl !== exceptEl) {
        dropEl.classList.remove("drop-active");
      }
    }
  } else {
    for (const dropEl of dropEls) {
      dropEl.classList.remove("drop-active");
    }
  }
}

dropEls.forEach((dropEl) => {
  dropEl.querySelector(".drop__icon")?.addEventListener("click", () => {
    removeDropActive(dropEl as HTMLElement);
    dropEl.classList.toggle("drop-active");
  });
  dropEl.querySelector(".drop__menu")?.addEventListener("click", () => {
    removeDropActive();
    navbarEl?.classList.remove("navbar-expand");
  });
});

document.querySelector(".nav__toggle")?.addEventListener("click", () => {
  navbarEl?.classList.toggle("navbar-expand");
});
