export {};

const removeSelf = (ele: HTMLElement) => {
  if (ele.parentElement) {
    ele.parentElement.removeChild(ele);
  }
};

const init = () => {
  const tocTargets = document.querySelectorAll(".toc-target");
  if (!tocTargets) return;

  const toc = document.querySelector(".toc");
  if (!toc || !(toc instanceof HTMLElement)) return;

  const placeHolders = toc.querySelectorAll("a");
  const linkTemplate = placeHolders
    ? placeHolders[0]
    : document.createElement("a");
  placeHolders.forEach(removeSelf);
  linkTemplate.textContent = "";
  linkTemplate.href = "";

  tocTargets.forEach((ele) => {
    if (!(ele instanceof HTMLElement)) return;
    const newLink = document.createElement("a");
    for (const classFromTemplate of linkTemplate.classList.values()) {
      newLink.classList.add(classFromTemplate);
    }

    newLink.textContent = ele.dataset.tocText || ele.textContent || ele.id;
    if (newLink.textContent == null) {
      console.error("Couldn't get name for toc entry.");
      return;
    }

    newLink.href = `#${ele.id}`;

    toc.appendChild(newLink);
  });
};

init();
