export {};

const MIN_TOUCH_DISTANCE = 40;

const galleryEls = document.querySelectorAll(".gallery");
for (const galleryEl of galleryEls) {
  if (!(galleryEl instanceof HTMLElement)) break;

  galleryEl.dataset.slideIndex = "0";
  galleryEl.dataset.imgCount = galleryEl
    .querySelectorAll(".imgbox__img")
    .length.toString();

  const imgboxEl = galleryEl.querySelector(".gallery__imgbox");
  imgboxEl?.addEventListener("click", imgboxClicked);
  imgboxEl?.addEventListener("touchstart", imgboxTouched);
  imgboxEl?.addEventListener("touchend", imgboxTouched);

  const thumbsContainerEl = galleryEl.querySelector(".gallery__thumbs");
  thumbsContainerEl?.addEventListener("click", thumbsClicked);
  const thumbEls = thumbsContainerEl?.querySelectorAll(".thumbs__thumb");
  if (!thumbEls) continue;
  for (const [i, thumbEl] of thumbEls.entries()) {
    if (thumbEl instanceof HTMLElement) {
      thumbEl.dataset.thumbIndex = i.toString();
    }
  }

  thumbEls[0].dispatchEvent(new PointerEvent("click", { bubbles: true }));
}

// Start evt handlers
function imgboxClicked(evt: Event) {
  if (!(evt instanceof PointerEvent && evt.target instanceof HTMLElement)) {
    return;
  }
  if (evt.offsetX > evt.target.getBoundingClientRect().width / 2) {
    updateSlide(evt, 1);
  } else {
    updateSlide(evt, -1);
  }
}

let touchPos: number = 0;
function imgboxTouched(evt: Event) {
  if (!(evt instanceof TouchEvent && evt.target instanceof HTMLElement)) {
    return;
  }
  if (evt.type == "touchstart") {
    touchPos = evt.touches[0].clientX;
    return;
  } else if (evt.type == "touchend") {
    touchPos -= evt.changedTouches[0].clientX;
    if (touchPos > MIN_TOUCH_DISTANCE) {
      updateSlide(evt, 1);
    } else if (touchPos < -1 * MIN_TOUCH_DISTANCE) {
      updateSlide(evt, -1);
    }
  }
}

function thumbsClicked(evt: Event) {
  if (
    !(
      evt instanceof PointerEvent &&
      evt.target instanceof HTMLElement &&
      evt.target.dataset.thumbIndex !== undefined
    )
  ) {
    return;
  }
  updateSlide(evt, 0, parseInt(evt.target.dataset.thumbIndex));
}
// End evt handlers

function updateSlide(evt: Event, direction: number, index?: number) {
  if (
    !(
      evt.currentTarget instanceof HTMLElement &&
      evt.currentTarget.parentElement instanceof HTMLElement
    )
  ) {
    return;
  }

  const galleryEl = evt.currentTarget.parentElement;
  const imgboxImgEls = galleryEl.querySelectorAll(".imgbox__img");
  const thumbImgEls = galleryEl.querySelectorAll(".thumbs__thumb");

  removeActiveClasses(imgboxImgEls, thumbImgEls);

  if (index === undefined) {
    const currentIndex = galleryEl.dataset.slideIndex
      ? parseInt(galleryEl.dataset.slideIndex)
      : 0;
    index = currentIndex + direction;
    if (index < 0) {
      index = imgboxImgEls.length - 1;
    } else if (index >= imgboxImgEls.length) {
      index = 0;
    }
  }

  galleryEl.dataset.slideIndex = index.toString();

  thumbImgEls[index].classList.add("thumb-active");

  const imgboxImgEl = imgboxImgEls[index] as HTMLElement;
  imgboxImgEl.classList.add("imgbox-active");
  const captionEl = galleryEl.querySelector(".imgbox__caption");
  if (captionEl) {
    captionEl.textContent = imgboxImgEl.dataset.caption
      ? imgboxImgEl.dataset.caption
      : "";
  }
}

function removeActiveClasses(
  imgboxImgEls: NodeListOf<Element>,
  thumbImgEls: NodeListOf<Element>
) {
  for (const imgboxImgEl of imgboxImgEls) {
    imgboxImgEl.classList.remove("imgbox-active");
  }
  for (const thumbImgEl of thumbImgEls) {
    thumbImgEl.classList.remove("thumb-active");
  }
}
