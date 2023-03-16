import { SLIDE_DURATION } from "./config.js";
import carouselView from "./views/carouselView.js";

// ! NAVIGATION
const controlNavigation = function () {
  const header = document.getElementById("header");
  const stickyNav = document.querySelector(".nav--sticky");

  const navHeight = stickyNav.getBoundingClientRect().height;
  // console.log(navHeight);
  const showNav = function (entries, observer) {
    const [entry] = entries;
    entry.isIntersecting
      ? stickyNav.classList.add("nav--hidden")
      : stickyNav.classList.remove("nav--hidden");
  };

  const headerObserver = new IntersectionObserver(showNav, {
    root: null,
    rootMargin: `-${navHeight}px`,
    threshold: 0,
  });
  headerObserver.observe(header);
};

const controlSlides = function() {
  carouselView.switchSlide();
};

const init = function () {
  controlNavigation();
  controlSlides();
};
init();

