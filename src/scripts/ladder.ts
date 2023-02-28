export {};

let resizeAttached = false;
let shouldFireOnResize = true;
const DEFAULT_GAP = 30;

function doLayout() {
  const els = document.querySelectorAll(".ladder");

  let gap = 0;
  let previousBottom = 0;

  for (let [i, el] of els.entries()) {
    if (!(el instanceof HTMLElement)) return;
    if (previousBottom == undefined) return;

    el.style.position = "fixed";

    if (!i) {
      gap = el.dataset.ladderGap ? parseInt(el.dataset.ladderGap) : DEFAULT_GAP;
      shouldFireOnResize = el.dataset.resize
        ? Boolean(el.dataset.resize)
        : true;
      previousBottom = el.getBoundingClientRect().bottom;

      continue;
    }

    previousBottom = previousBottom + gap;
    el.style.top = `${previousBottom}px`;
    previousBottom = previousBottom + el.getBoundingClientRect().height;
  }

  if (!resizeAttached && shouldFireOnResize) {
    window.addEventListener("resize", doLayout);
    resizeAttached = true;
  }
}

window.addEventListener("DOMContentLoaded", doLayout);
