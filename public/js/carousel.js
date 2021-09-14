"use strict";
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);
// image wrapper inner width
const slideWidth = slides[0].getBoundingClientRect().width;

// arrange slide
const setSlidePosition = (slide, index) =>
  (slide.style.left = `${slideWidth * index}px`);
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

// move remove/add active class on dots if slide moves handler
const updateDots = (currentdot, targetdot) => {
  currentdot.classList.remove("current-slide");
  targetdot.classList.add("current-slide");
};

// hide/show slide buttons on dot clicks
const hideShowSlideArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

// when previous button clicked move slide to left
prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const previousSlide = currentSlide.previousElementSibling;

  // move active class from dots when previous button is clicked
  const current_dot = dotsNav.querySelector(".current-slide");
  const previouse_dot = current_dot.previousElementSibling;

  const prevIndexx = slides.findIndex((slide) => slide === previousSlide);

  moveToSlide(track, currentSlide, previousSlide);
  updateDots(current_dot, previouse_dot);
  hideShowSlideArrows(slides, prevButton, nextButton, prevIndexx);
});

// when next button clicked move slide to right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  //   move active class from dots when next button is clicked
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndexx = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowSlideArrows(slides, prevButton, nextButton, nextIndexx);
});

// add tracker class on nav dots on image slide.

Array.from(dotsNav.children).forEach((targetDot, index) => {
  targetDot.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");

    const targetSlide = slides[index];
    targetDot.classList.add("active");

    // remove active/add class on dot clicks
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowSlideArrows(slides, prevButton, nextButton, index);
  });
});
